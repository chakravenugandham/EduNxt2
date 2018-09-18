// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://ec2-13-251-23-36.ap-southeast-1.compute.amazonaws.com:8080/api/v1/lnd/",
  // baseUrl: 'http://172.24.1.53:8080/api/v1/lnd/',
  logoutUrl: 'http://ec2-13-251-23-36.ap-southeast-1.compute.amazonaws.com:8080/logout'
  // logoutUrl: 'http://http://172.24.1.53:8080/logout'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
