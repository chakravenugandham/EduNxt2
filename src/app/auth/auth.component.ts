import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Numeric } from 'd3';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from "./services/auth.service";

declare var $: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authTokenReceived: Numeric;
  loginForm: FormGroup;
  pass: FormControl;
  email: FormControl;
  issubmmited: boolean;
  _isvalid: String;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService
  ) {
    this.authTokenReceived = 0;
    this._isvalid = "";
  }

  createFormControls() {

    this.pass = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$"),

    ]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      pass: this.pass,
      email: this.email,
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.issubmmited = false;
    // console.log(this.loginForm);
    // console.log(this.pass);
    if (localStorage.getItem('t')) {
      const t = localStorage.getItem('t');
      console.log(t);
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(t);
      //const redirectUrl = (this.cookieService.get('redirectUrl') == '') ? '/' : this.cookieService.get('redirectUrl');
      if (isExpired) {
        localStorage.removeItem('t');
        this.authTokenReceived = -1;
        //window.location.href = redirectUrl;
      }
      else {
        this.authTokenReceived = 1;
        this.router.navigate(['/LnD']);
      }
    }

    let showPass = 0;
    $('.btn-show-pass').on('click', function () {
      if (showPass == 0) {
        $(this).next('input').attr('type', 'text');
        $(this).find('i').removeClass('fa-eye');
        $(this).find('i').addClass('fa-eye-slash');
        showPass = 1;
      } else {
        $(this).next('input').attr('type', 'password');
        $(this).find('i').removeClass('fa-eye-slash');
        $(this).find('i').addClass('fa-eye');
        showPass = 0;
      }
    });
  }



  login() {
    this.issubmmited = true;
    this._isvalid = "";
    if (this.loginForm.valid) {
      this.authService.authUser(this.email.value, this.pass.value).subscribe((response: any) => {
        if (response.status.type === "success") {
          const t = response.data;
          console.log(t);
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(t);
          const expirationDate = helper.getTokenExpirationDate(t);
          const isExpired = helper.isTokenExpired(t);
          let loginName = decodedToken.loginName;
          let userName = loginName.split("_");
          if (userName.length > 1) {
            this.cookieService.set('user_name', userName[1]);
          }
          else {
            this.cookieService.set('user_name', decodedToken.loginName);
          }
          this.cookieService.set('redirectUrl', "/#/auth");
          this.cookieService.set('tenantName', decodedToken.tenantName);
          this.cookieService.set('user_id', decodedToken.personId);
          if (isExpired) {
            localStorage.removeItem('t');
          }
          else {
            localStorage.setItem('t', t);
            this.router.navigate(['/LnD']);
          }
        }
        else {

        }
        // console.log(response);
      },
        error => {
          this._isvalid = "Invaild login details !";
        }
      );
    }

    //console.log(response);
    // console.log(this.loginForm);
    // console.log(this.pass);
    // console.log(this.pass.dirty);
    // console.log(this.loginForm.dirty);
    // console.log(this.loginForm.touched);
    // console.log(this.pass.touched);
  }
  get isvalid() {
    return this._isvalid;
  }

}
