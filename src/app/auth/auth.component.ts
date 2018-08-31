import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Numeric } from 'd3';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authTokenReceived: Numeric;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.authTokenReceived = 0;
  }

  ngOnInit() {
    if (localStorage.getItem('t')) {
      const t = localStorage.getItem('t');
      console.log(t);
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(t);
      const redirectUrl = (this.cookieService.get('redirectUrl') == '') ? '/' : this.cookieService.get('redirectUrl');

      if (isExpired) {
        localStorage.removeItem('t');
        this.authTokenReceived = -1;
        window.location.href = redirectUrl;
      }
      else {
        this.authTokenReceived = 1;
        this.router.navigate(['/LnD']);
      }
    }
  }

}
