import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ActiveUsersService {

  constructor(private http: HttpClient) { }
  usersUrl = "http://192.168.239.38:3000/api/v1/active-users-graph"

  locationUrl = "http://192.168.239.38:3000/api/v1/activity-by-location"

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  getActiveUsers(userInfo: any[]) {
    return this.http.post(this.usersUrl, userInfo, {headers: this.headers});
  }
  getLocationData(userInfo: any[]){
    this.http.post(this.locationUrl, userInfo);
  }
}