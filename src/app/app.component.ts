import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  authTokenReceived: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.authTokenReceived = false;
  }

  getLoginUserData() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['t'] || localStorage.getItem('t')) {
        const t = (params['t']) ? params['t'] : localStorage.getItem('t');
        console.log(t);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(t);
        const expirationDate = helper.getTokenExpirationDate(t);
        const isExpired = helper.isTokenExpired(t);
        const loginName = decodedToken.loginName;
        const userName = loginName.split('_');
        if (userName.length > 1) {
          this.cookieService.set('user_name', userName[1]);
        } else {
          this.cookieService.set('user_name', decodedToken.loginName);
        }

        this.cookieService.set('redirectUrl', decodedToken.iss);
        this.cookieService.set('tenantName', decodedToken.tenantName);
        this.cookieService.set('user_id', decodedToken.personId);
        if (isExpired) {
          localStorage.removeItem('t');
          this.authTokenReceived = false;
        } else {
          localStorage.setItem('t', t);
          this.authTokenReceived = true;
          this.router.navigate(['/LnD']);
        }
      }
    });
  }
  ngOnInit() {
    this.getLoginUserData();
  }
}

