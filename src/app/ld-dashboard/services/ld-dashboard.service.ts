import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LdDashboardService {
  refreshAPI$ = new Subject<any>();

  start_date: string = "29/03/2018";
  end_date: string = "29/06/2018";

  constructor(private http: HttpClient) { }

  get refreshAPI() {
    return this.refreshAPI$.asObservable();
  }

  //baseURL from enviornment
  baseURL = environment.baseUrl;
  headers = new HttpHeaders().set('LnDUserId', '37046').set('courseId', '0').set('progaramId', '0');
  headers1 = new HttpHeaders().set('LnDUserId', '57142').set('courseId', '0').set('progaramId', '0');

  setHeaders(config?: any) {
    let headers = new HttpHeaders().set("LnDUserId", "37046");
    let headers1 = new HttpHeaders().set("LnDUserId", "57142");
    for (let key in config) {
      headers = headers.append(key, config[key]);
      headers1 = headers1.append(key, config[key]);
    }
    this.headers = headers;
    this.headers1 = headers1;
    this.refreshAPI$.next();
  }

  //courses dropdown
  getCoursesData() {
    let url = this.baseURL + "courses-dropdown";
    return this.http.get(url, { headers: this.headers1 });
  }

  //first four widgets
  getActivityData() {
    let url = this.baseURL + "learning-activities" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.get(url, { headers: this.headers1 });
  }

  getImageData() {
    let url = this.baseURL + "active-users";
    return this.http.get(url);
  }

  //goals and timespent widgets
  getGoalsData() {
    let url = this.baseURL + "goals" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.get(url, { headers: this.headers1 });
  }

  //active users & mode of delivery data
  getActiveUsersData(filterbody) {
    let url = this.baseURL + "active-users-graph" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //location data

  getLocationData(filterbody) {
    let url = this.baseURL + "activity-by-location" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-track widget data
  getLearnerTrackData(filterbody) {
    let url = this.baseURL + "learner-pace-performance" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    let headers = new HttpHeaders()
      .set("LnDUserId", "1001")
      .set("courseId", "0");
    return this.http.post(url, filterbody, { headers: headers });
  }

  //learner-track full details
  getLearnerTrackDetails(componentName, displayfor, filterbody) {
    let url =
      this.baseURL + "learner-pace-performance-details?type=" + componentName + "&displayFor=" + displayfor + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    let headers = new HttpHeaders()
      .set("LnDUserId", "1001")
      .set("courseId", "0");
    return this.http.post(url, filterbody, { headers: headers });
  }

  //learner-track graph details
  getGraphDetails() {
    let url = this.baseURL + "learner-pace-performance" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    let headers = new HttpHeaders()
      .set("LnDUserId", "1001")
      .set("courseId", "0");
    return this.http.post(url, null, { headers: headers });
    // return this.http.post(url, null, { headers: this.headers });
  }

  //learner-performance
  getLearnerPerformanceData(filterbody) {
    let url = this.baseURL + "learner-performance-progress" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-performance full details
  getLearnerPerformanceDetails() {
    let url = this.baseURL + "learner-performance-progress-details" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-interest
  getOrgInterestData() {
    let url = this.baseURL + "organization-interests" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance teams data
  getTrainersData() {
    let url = this.baseURL + "trainer-leaderboard" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance trainers data
  getTeamData() {
    let url = this.baseURL + "team-leaderboard" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance leaners data
  getLearnerData() {
    let url = this.baseURL + "learner-leaderboard" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //scores-distribution based on component type
  getScoresDistrubution(componentName, filterbody) {
    let url = this.baseURL + "scores-distribution?type=" + componentName + "&start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //scores full-details
  getScoresDetails(dropdownValue) {
    let url =
      this.baseURL + "scores-distribution-details?type=" + dropdownValue + "&start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //content-performing
  getContentData() {
    let url = this.baseURL + "content-consumption" + "?start_date=" + this.start_date + "&end_date=" + this.end_date;
    return this.http.post(url, null, { headers: this.headers });
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
