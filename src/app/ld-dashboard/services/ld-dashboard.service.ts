import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LdDashboardService {
  constructor(private http: HttpClient) { }

  baseURL = "http://192.168.234.6:3000/api/v1/";
  // baseURL = "http://innominds-analytics.cmmtocbvzm4p.ap-southeast-1.rds.amazonaws.com:3000/api/v1/";
  headers = new HttpHeaders().set("LnDUserId", "1").set("courseId", "101");

  //courses dropdown
  getCoursesData() {
    let url = this.baseURL + "courses-dropdown";
    return this.http.get(url);
  }

  //activity at glance
  getActivityData() {
    let url = this.baseURL + "learning-activities";
    //let url = "https://api.myjson.com/bins/o83wu";
    return this.http.get(url);
  }
  getGoalsData() {
    let url = this.baseURL + "goals";
    return this.http.get(url);
  }

  //active users widget
  getActiveUsersData() {
    let url = this.baseURL + "active-users-graph";
    return this.http.post(url, { headers: this.headers });
  }
  getLocationData() {
    let url = this.baseURL + "activity-by-location";
    return this.http.post(url, { headers: this.headers });
  }

  //learner-track
  getLearnerTrackData(componentName) {
    let url = this.baseURL + "learner-pace-performance?type=" + componentName;
    return this.http.post(url, { headers: this.headers });
  }
  getLearnerTrackDetails() {
    let url = this.baseURL + "learner-pace-performance-details";
    return this.http.post(url, { headers: this.headers });
  }

  getGraphDetails() {
    let url = this.baseURL + "learner-pace-performance";
    return this.http.post(url, { headers: this.headers });
  }

  //learner-performance
  getLearnerPerformanceData() {
    // let url = this.baseURL + "learner-performance-progress";
    // return this.http.post(url, { headers: this.headers });
    // let url = "https://api.myjson.com/bins/wv4za";
    let url = "https://api.myjson.com/bins/18ynzq";
    return this.http.get(url);
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
  getOrgInterestDetails() {
    let url = this.baseURL + "organization-interests-details";
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
  getScoresDistrubution(componentName) {
    let url = this.baseURL + "scores-distribution?type=" + componentName;
    return this.http.post(url, { headers: this.headers });
  }
  getScoresDetails() {
    let url = this.baseURL + "scores-distribution-details";
    return this.http.post(url, { headers: this.headers });
  }

  getZoneFilters() {
    let url = this.baseURL + "zones-dropdown";
    //let url = "https://api.myjson.com/bins/1012oe"
    return this.http.post(url, { headers: this.headers });
  }

  //content-performing
  getContentData() {
    let url = this.baseURL + "content-consumption";
    return this.http.post(url, { headers: this.headers });
  }

  //get-filters
  getFiltersData(filtersList) {
    let filters = "";
    if (filtersList.length > 1) {
      for (let i in filtersList)
        filters += filtersList[i] + ',';
    }
    filters = filters.slice(0, -1);
    // let url = this.baseURL + "dropDown?type=" + filters;
    let url = "https://api.myjson.com/bins/pplaq";
    return this.http.get(url);
  }

}
