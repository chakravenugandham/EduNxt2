import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { LdDashboardService } from "../ld-dashboard/services/ld-dashboard.service";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: LdDashboardService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(tap());
    }
}
 