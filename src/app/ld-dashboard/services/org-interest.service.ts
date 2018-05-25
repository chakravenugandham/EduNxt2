import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrgInterestService {

  url = "http://192.168.239.38:3000/api/v1/organization-interests";
  data = {};
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.post(this.url, { headers: this.headers });
  }
}
