import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LdDashboardService {
  constructor(private http: HttpClient) {}

  baseURL = environment.baseUrl;
  // baseURL = "http://192.168.239.38:3000/api/v1/lnd/";
  // baseURL = "http://innominds-analytics.cmmtocbvzm4p.ap-southeast-1.rds.amazonaws.com:3000/api/v1/";
  headers = new HttpHeaders().set("LnDUserId", "1002");

  //courses dropdown

  getCoursesData() {
    let url = this.baseURL + "courses-dropdown";
    let headers = new HttpHeaders().set("LnDUserId", "1002");
    return this.http.get(url, { headers: headers });
  }

  //activity at glance
  getActivityData() {
    let url = this.baseURL + "learning-activities";
    return this.http.get(url, { headers: this.headers });
  }
  getGoalsData() {
    let url = this.baseURL + "goals";
    // let headers = new HttpHeaders().set("LnDUserId", "1001").set("courseId", "994");
    return this.http.get(url, { headers: this.headers });
  }

  //active users widget
  getActiveUsersData(filterbody) {
    let url = this.baseURL + "active-users-graph";
    return this.http.post(url, filterbody, { headers: this.headers });
  }
  getLocationData(filterbody) {
    let url = this.baseURL + "activity-by-location";
    let headers = new HttpHeaders().set("LnDUserId", "3207");
    return this.http.post(url, filterbody, { headers: headers });
  }

  //learner-track
  getLearnerTrackData(filterbody) {
    let url = this.baseURL + "learner-pace-performance";
    let headers = new HttpHeaders().set("LnDUserId", "1001");
    return this.http.post(url, filterbody, { headers: headers });
  }
  getLearnerTrackDetails(componentName, filterbody) {
    let url =
      this.baseURL + "learner-pace-performance-details?type=" + componentName;
    let headers = new HttpHeaders().set("LnDUserId", "1001");
    return this.http.post(url, filterbody, { headers: headers });
  }

  getGraphDetails() {
    let url = this.baseURL + "learner-pace-performance";
    return this.http.post(url, { headers: this.headers });
  }

  //learner-performance
  getLearnerPerformanceData(filterbody) {
    let url = this.baseURL + "learner-performance-progress";
    let headers = new HttpHeaders().set("LnDUserId", "0");
    return this.http.post(url, filterbody, { headers: headers });
  }
  getLearnerPerformanceDetails() {
    let url = this.baseURL + "learner-performance-progress-details";
    return this.http.post(url, { headers: this.headers });
  }

  //org-interest
  getOrgInterestData() {
    let url = this.baseURL + "organization-interests";
    return this.http.post(url, { headers: this.headers });
  }
  getOrgInterestDetails(componentName, filterbody) {
    let url =
      this.baseURL + "organization-interests-details?type=" + componentName;
    return this.http.post(url, { headers: this.headers });
  }

  //org-performance
  getTrainersData() {
    let url = this.baseURL + "trainer-leaderboard";
    return this.http.post(url, { headers: this.headers });
  }
  getTeamData() {
    let url = this.baseURL + "team-leaderboard";
    return this.http.post(url, { headers: this.headers });
  }
  getLearnerData() {
    let url = this.baseURL + "learner-leaderboard";
    return this.http.post(url, { headers: this.headers });
  }

  //scores-distribution
  getScoresDistrubution(componentName, filterbody) {
    let url = this.baseURL + "scores-distribution?type=" + componentName;
    return this.http.post(url, filterbody, { headers: this.headers });
  }
  getScoresDetails(dropdownValue) {
    let url =
      this.baseURL + "scores-distribution-details?type=" + dropdownValue;
    return this.http.post(url, { headers: this.headers });
  }

  // getFilters() {
  //   let url = this.baseURL + "dropDown";
  //   //let url = "https://api.myjson.com/bins/1012oe"
  //   return this.http.post(url, { headers: this.headers });
  // }

  //content-performing
  getContentData() {
    let url = this.baseURL + "content-consumption";
    return this.http.post(url, { headers: this.headers });
  }

  //get-filters
  getFiltersData(filtersList) {
    let filters = "";
    if (filtersList.length > 1) {
      for (let i in filtersList) filters += filtersList[i] + ",";
      filters = filters.slice(0, -1);
    }
    filters = filtersList[0];
    let url = this.baseURL + "dropDown?type=" + filters;
    // let url = "https://api.myjson.com/bins/pplaq";
    // let url = "https://api.myjson.com/bins/m3a0m";
    return this.http.get(url);
  }
}
