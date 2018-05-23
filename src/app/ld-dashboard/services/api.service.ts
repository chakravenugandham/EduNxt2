// import { Injectable, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// import { AuthService } from '../auth.service';
// import { ApiRoutesService } from './api-routes.service';
// import { ErrorResponse } from '@app/shared/classes/error-response';
// import { UtilService } from '../util.service';

// @Injectable()
// export class ApiService implements OnInit {
//     static buildVersion: string;

//     constructor(protected http: HttpClient,
//                 protected authService: AuthService,
//                 public routes: ApiRoutesService,
//                 public utilService: UtilService) {
//     }

//     ngOnInit() {}

//     // --- Utility methods ---

//     createHeaders(config?: any) {
//         const accept = config && config.accept ? config.accept : 'application/json';
//         const contentType = config && config.contentType ? config.contentType : 'application/json';

//         let headers = new HttpHeaders()
//             .set('Accept', accept)
//             .set('Content-Type', contentType)
//             .set('Auth-Token', this.authService.getToken());

//         const cookies: any = UtilService.checkCookieData();
//         if (cookies.csrftoken) headers = headers.set('X-CSRFToken', cookies.csrftoken);

//         return headers;
//     }

//     createSearchParams(payload?: any) {
//         payload = payload || {};

//         let params = new HttpParams();
//         // avoid browser caching
//         if (ApiService.buildVersion) params = params.set('v', ApiService.buildVersion);

//         for (const i in payload) {
//             // If array is { value: ['a', 'b'] }, then we'll want to convert this to ?value=a&value=b
//             if (Array.isArray(payload[i])) {
//                 payload[i].forEach(value => {
//                     params = params.append(i, value);
//                 });
//             } else {
//                 params = params.append(i, payload[i]);
//             }
//         }
//         return params;
//     }

//     createOptions(payload?: any, headerOptions?: any) {
//         const headers = this.createHeaders(headerOptions);
//         const params = this.createSearchParams(payload);

//         return {
//             headers: headers,
//             params: params
//         };
//     }

//     // --- CRUD methods ---

//     __getObservable(url: string, payload?: any) {
//         return this.http.get(url, this.createOptions(payload));
//     };

//     __get(url: string, payload?: any, headerOptions?: any) {
//         return this.http.get(url, this.createOptions(payload, headerOptions)).toPromise();
//     };

//     __patch(url: string, payload?: any) {
//         return this.http.patch(url, payload, this.createOptions()).toPromise();
//     }

//     __post(url: string, payload: any, headerOptions?: any, queryParams?: any) {
//         return this.http.post(url, payload, this.createOptions(queryParams, headerOptions)).toPromise();
//     };


//     __put(url: string, payload: any, contentType?: string) {
//         return this.http.put(url, payload, { headers: this.createHeaders({ contentType: contentType }) }).toPromise();
//     };

//     __delete(url: string) {
//         return this.http.delete(url, this.createOptions()).toPromise();
//     };

//     // --- Commonly used methods ---

//     /**
//      * Returns metadata about the resource such as types, max lengths, enumerated values, etc.
//      * @param url
//      * @returns {Promise<TResult>}
//      * @private
//      */
//     __options(url: string, options: any = {}) {
//         const headers: HttpHeaders = this.createHeaders();
//         // TODO couldn't get this to cache, need to revisit
//         if (options.cache) headers.append('Cache-Control', 'max-age=30');
//         return this.http.options(url, { headers: headers }).toPromise();
//     };

//     /**
//      * Parses API errors.
//      * @param error
//      * @returns {Promise<void>|Promise<T>}
//      */
//     handleError(error: any): Promise<any> {
//         let output: ErrorResponse = new ErrorResponse({message: 'An error occurred.'});
//         let errorResponse;

//         switch (error.status) {
//             // Standardized server response (we can assume json)
//             case 400:
//                 errorResponse = error.error;
//                 output = new ErrorResponse(errorResponse);
//                 break;

//             // Authorized
//             case 401:
//             // Not Found error
//             case 404:
//             // Conflict
//             case 409:
//             // Unprocessable Entity
//             case 422:
//             // Bad Gateway error -- typically server is not running
//             case 502:
//                 output = new ErrorResponse({message: error.statusText});

//                 // If back-end error is provided, use this instead since it's more specific
//                 errorResponse = error.error;
//                 if (errorResponse) output = new ErrorResponse(errorResponse);
//                 break;
//             default:
//                 console.error('An error occurred', error);
//                 break;
//         }

//         output.status = error.status;
//         output.statusText = error.status;

//         return Promise.reject(output);
//     }

//     get(url: string, payload?: any, all?: boolean): Promise<any> {
//         return this.__get(url, payload)
//             .then(response => {
//                 if (response['items']) {
//                     return Promise.resolve(all ? response['items'] : response['items'][0]);
//                 } else {
//                     return Promise.resolve(response);
//                 }
//             })
//             .catch(this.handleError);
//     }

//     validate(url: string, payload: any): Promise<any> {
//         url = url.endsWith('/') ? url : url + '/';
//         return this.__post(url + 'validate/', payload)
//             .catch(this.handleError);
//     }

//     create(url: string, payload: any): Promise<any> {
//         return this.__post(url, payload)
//             .catch(this.handleError);
//     }

//     update(payload: any, url?: string, contentType?: any): Promise<any> {
//         url = url || payload._url;
//         if (!url) throw new Error('Missing URL');
//         return this.__put(url, payload, contentType)
//             .catch(this.handleError);
//     }

//     save(url: string, payload: any): Promise<any> {
//         if (!payload.id) return this.create(url, payload);
//         else return this.update(payload);
//     }

//     getProductInfo() {
//       return this.__get( this.routes.urls.PRODUCT_INFO, {});
//     };

//     login(auth) {
//         const headers = new HttpHeaders({
//             'Accept': 'application/json',
//             'Authorization': auth
//         });

//         return this.http.post(this.routes.urls.LOGIN, {}, { observe: 'response', headers: headers }).toPromise();
//     };

//     logout() {
//         return this.__post(this.routes.urls.LOGOUT, {});
//     }

//     getHealth () {
//       return this.__get(this.routes.urls.APPLIANCE_HEALTH, {});
//     };

//     // __get images blobs and return when all have completed
//     getImages (images) {
//         const imgHeaders =  new HttpHeaders({
//             'Accept': 'image/png',
//             'Auth-Token': this.authService.getToken()
//         });

//         const params = new HttpParams();
//         params.set('responseType', 'blob');

//         const promises = images.map(function(path) {
//             const url = this.routes.urls.APPLIANCE_HEALTH + '/' + path;

//             this.http.get(url, { headers: imgHeaders, search: params }).toPromise();
//             // return http.__get({
//             //     method: 'GET',
//             //     url: this.routes.urls.APPLIANCE_HEALTH + '/' + path,
//             //     responseType: 'blob',
//             //     headers: {
//             //       'Accept': 'image/png',
//             //       'Auth-Token': Auth.getToken()
//             //     }
//             //  });
//         });
//         return Promise.all(promises);
//     };
// }
