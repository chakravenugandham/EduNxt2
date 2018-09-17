import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs";
import { APIURL } from "../../apiURL";
import { DateserviceService } from "../../common-services/dateservice.service";
import { Md5 } from 'ts-md5/dist/md5';

import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnInit {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  //baseURL from enviornment
  baseURL = environment.baseUrl;

  headers = new HttpHeaders();

  authUser(email: string, password: string) {
    const md5 = new Md5();
    let authHash = md5.appendStr(email.toLocaleLowerCase() + ":" + password.toLocaleLowerCase()).end().toString();
    this.headers = new HttpHeaders().set("a", authHash);
    let url = this.baseURL + APIURL.AUTH_USER;
    return this.http.get(url, { headers: this.headers });
  }


  ngOnInit() { }
}
