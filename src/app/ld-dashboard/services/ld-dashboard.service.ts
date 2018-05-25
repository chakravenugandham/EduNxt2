import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LdDashboardService {

  constructor(private http: HttpClient) { }

  baseURL = "http://192.168.239.38:3000/api/v1/";
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getActivityData() {
    let url = this.baseURL + "learning-activities";
    //let url = "https://api.myjson.com/bins/o83wu";
    return this.http.get(url);
  }

  getActiveUsersData(userInfo: any[]) {
    let url = this.baseURL + "active-users-graph";
    return this.http.post(url, userInfo, { headers: this.headers });
  }

  getLocationData(userInfo: any[]) {
    let url = this.baseURL + "activity-by-location";
    this.http.post(url, userInfo, { headers: this.headers });
  }

  getContentData(userInfo: any[]) {
    let url = this.baseURL + "content-consumption";
    return this.http.post(url, userInfo, { headers: this.headers });
  }

}
