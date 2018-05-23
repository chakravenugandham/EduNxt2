import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  //url: string = "http://192.168.239.38:3000/api/v1/learning-activities";
  url: string = "https://api.myjson.com/bins/o83wu";
  getActivityData() {
    //const url = this.baseURL + this.urls[urlparam];
    return this.http.get(this.url);
  }


  baseURL: string = 'http://192.168.239.38:3000/api/v1/';
  urls = {
    'DASHBOARD': 'learning-activities'
  }
}
