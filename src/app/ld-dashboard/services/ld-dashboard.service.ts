import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LdDashboardService {
  constructor(private http: HttpClient) {}

  //baseURL from enviornment
  baseURL = environment.baseUrl;
  headers = new HttpHeaders().set("LnDUserId", "37046").set("courseId", "0");

  //courses dropdown
  getCoursesData() {
    let url = this.baseURL + "courses-dropdown";
    return this.http.get(url, { headers: this.headers });
  }

  //first four widgets
  getActivityData() {
    let url = this.baseURL + "learning-activities";
    return this.http.get(url, { headers: this.headers });
  }

  //goals and timespent widgets
  getGoalsData() {
    let url = this.baseURL + "goals";
    return this.http.get(url, { headers: this.headers });
  }

  //active users & mode of delivery data
  getActiveUsersData(filterbody) {
    let url = this.baseURL + "active-users-graph";
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //location data

  getLocationData(filterbody) {
    let url = this.baseURL + "activity-by-location";
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-track widget data
  getLearnerTrackData(filterbody) {
    let url = this.baseURL + "learner-pace-performance";
    let headers = new HttpHeaders().set("LnDUserId", "1001");
    return this.http.post(url, filterbody, { headers: headers });
  }

  //learner-track full details
  getLearnerTrackDetails(componentName, filterbody) {
    let url =
      this.baseURL + "learner-pace-performance-details?type=" + componentName;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-track graph details
  getGraphDetails() {
    let url = this.baseURL + "learner-pace-performance";
    return this.http.post(url, { headers: this.headers });
  }

  //learner-performance
  getLearnerPerformanceData(filterbody) {
    let url = this.baseURL + "learner-performance-progress";
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-performance full details
  getLearnerPerformanceDetails() {
    let url = this.baseURL + "learner-performance-progress-details";
    return this.http.post(url, { headers: this.headers });
  }

  //org-interest
  getOrgInterestData() {
    let url = this.baseURL + "organization-interests";
    return this.http.post(url, { headers: this.headers });
  }

  //org-interest full details
  getOrgInterestDetails(componentName, filterbody) {
    let url =
      this.baseURL + "organization-interests-details?type=" + componentName;
    return this.http.post(url, { headers: this.headers });
  }

  //org-performance teams data
  getTrainersData() {
    let url = this.baseURL + "trainer-leaderboard";
    return this.http.post(url, { headers: this.headers });
  }

  //org-performance trainers data
  getTeamData() {
    let url = this.baseURL + "team-leaderboard";
    return this.http.post(url, { headers: this.headers });
  }

  //org-performance leaners data
  getLearnerData() {
    let url = this.baseURL + "learner-leaderboard";
    return this.http.post(url, { headers: this.headers });
  }

  //scores-distribution based on component type
  getScoresDistrubution(componentName, filterbody) {
    let url = this.baseURL + "scores-distribution?type=" + componentName;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //scores full-details
  getScoresDetails(dropdownValue) {
    let url =
      this.baseURL + "scores-distribution-details?type=" + dropdownValue;
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
      for (let i in filtersList) filters += filtersList[i] + ",";
      filters = filters.slice(0, -1);
    }
    filters = filtersList[0];
    let url = this.baseURL + "dropDown?type=" + filters;
    return this.http.get(url);
  }
}
