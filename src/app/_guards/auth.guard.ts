import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('t')) {
            const helper = new JwtHelperService();
            const t = localStorage.getItem('t');
            const decodedToken = helper.decodeToken(t);
            const expirationDate = helper.getTokenExpirationDate(t);
            const isExpired = helper.isTokenExpired(t);
            console.log("---//Sddsds");
            console.log(JSON.stringify(expirationDate));
            console.log(JSON.stringify(isExpired));
            console.log(JSON.stringify(decodedToken));
            if(isExpired)
            {
                localStorage.removeItem('t');
                return false;
            }
            else
            {
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/']);
        return false;
    }
}