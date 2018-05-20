import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  url: string = "https://api.myjson.com/bins/o83wu";
  getActivityData(){
    return this.http.get(this.url);
  }
}
