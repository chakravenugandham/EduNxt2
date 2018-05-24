import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ContentConsumptionService {
  url = "http://192.168.239.38:3000/api/v1/content-consumption";
  data = {};
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  getData(userInfo: any[]) {
    return this.http.post(this.url, userInfo, {headers: this.headers});
  }
}
