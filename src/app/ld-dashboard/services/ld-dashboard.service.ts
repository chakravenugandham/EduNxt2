import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LdDashboardService {
  constructor(private http: HttpClient) { }

  baseURL = "http://192.168.239.38:3000/api/v1/";
  //userInfo = [{ L_D_UserId: 1, CourseId: 1 }];
  //headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers = new HttpHeaders().set("LnDUserId", "1").set("courseId", "101");

  getActivityData() {
    let url = this.baseURL + "learning-activities";
    //let url = "https://api.myjson.com/bins/o83wu";
    return this.http.get(url);
  }

  getActiveUsersData() {
    let url = this.baseURL + "active-users-graph";
    return this.http.post(url, { headers: this.headers });
  }

  getLocationData() {
    let url = this.baseURL + "activity-by-location";
    return this.http.post(url, { headers: this.headers });
  }
  
  getLearnerTrackData(componentName){
    let url = this.baseURL + "learner-pace-performance?type=" + componentName;
    return this.http.post(url, { headers: this.headers });
  }
  getContentData() {
    let url = this.baseURL + "content-consumption";
    return this.http.post(url, { headers: this.headers });
  }

  getOrgInterestData() {
    let url = this.baseURL + "organization-interests";
    return this.http.post(url, { headers: this.headers });
  }

  getCoursesData() {
    let url = this.baseURL + "courses-dropdown";
    return this.http.get(url);
  }

  getTrainersData() {
    let url = this.baseURL + "trainer-leaderboard";
    return this.http.post(url, { headers: this.headers });
  }
  
  getTeamsData() {
    let url = this.baseURL + "teams-leaderboard";
    return this.http.post(url, { headers: this.headers });
  }
  
  getLearnersData() {
    let url = this.baseURL + "learners-leaderboard";
    return this.http.post(url, { headers: this.headers });
  }

  getScoresDistrubution() {
    let url = this.baseURL + "scores-distribution";
    return this.http.post(url, { headers: this.headers });
  }

  getZoneFilters() {
    //let url = this.baseURL + "zones-dropdown";
    let url = "https://api.myjson.com/bins/1012oe"
    //return this.http.post(url, { headers: this.headers });
    return this.http.get(url);
  }
}
