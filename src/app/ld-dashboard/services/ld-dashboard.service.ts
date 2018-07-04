import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs";
import { APIURL } from "../../apiURL";
import { CommonService } from "../services/common.service";

@Injectable({
  providedIn: "root"
})
export class LdDashboardService implements OnInit {
  refreshAPI$ = new Subject<any>();

  // start_date: string = "29/03/2018";
  // end_date: string = "29/06/2018";

  start_date: string = "";
  end_date: string = "";

  tempString = "";

  constructDate() {
    let today = new Date();
    this.end_date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();

    let last_date = new Date(today.setDate(today.getDate() - 30));
    this.start_date =
      last_date.getDate() +
      "/" +
      (last_date.getMonth() + 1) +
      "/" +
      last_date.getFullYear();
  }

  constructor(private http: HttpClient, private dateDetails: CommonService) {
    this.constructDate();
  }

  get refreshAPI() {
    return this.refreshAPI$.asObservable();
  }

  getDateChange() {
    this.start_date = this.dateDetails.dateFilterBodyDetails["start_date"];
    this.end_date = this.dateDetails.dateFilterBodyDetails["end_date"];
    this.refreshAPI$.next();
  }

  //baseURL from enviornment
  baseURL = environment.baseUrl;
  headers = new HttpHeaders()
    .set("LnDUserId", "37046")
    .set("courseId", "0")
    .set("progaramId", "0");
  headers1 = new HttpHeaders()
    .set("LnDUserId", "57142")
    .set("courseId", "0")
    .set("progaramId", "0");

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

  getActiveUsersWidgetData() {
    let url = this.baseURL + APIURL.ACTIVE_USERS;
    return this.http.get(url, { headers: this.headers1 });
  }

  //first four widgets
  getActivityData() {
    let url =
      this.baseURL +
      "learning-activities" +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    console.log("start_date", this.start_date);
    console.log("end_date", this.end_date);

    return this.http.get(url, { headers: this.headers1 });
  }

  getImageData() {
    let url = this.baseURL + "active-users";
    return this.http.get(url);
  }

  //goals and timespent widgets
  getGoalsData() {
    let url =
      this.baseURL +
      "goals" +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.get(url, { headers: this.headers1 });
  }

  //active users & mode of delivery data
  // + "?start_date=" + this.start_date + "&end_date=" + this.end_date
  getActiveUsersData(filterbody) {
    let url = this.baseURL + APIURL.ACTIVE_USERS_GRAPH;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //location data

  getLocationData(filterbody) {
    let url =
      this.baseURL +
      APIURL.LOCATION +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-track widget data
  getLearnerTrackData(filterbody) {
    let url =
      this.baseURL +
      APIURL.LEARNER_PACE_PERFORMANCE +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    let headers = new HttpHeaders()
      .set("LnDUserId", "1001")
      .set("courseId", "0");
    return this.http.post(url, filterbody, { headers: headers });
  }

  //learner-track full details
  getLearnerTrackDetails(componentName, displayfor, filterbody) {
    let url =
      this.baseURL +
      APIURL.LEARNER_PACE_PERFORMANCE_DETAILS +
      "?type=" +
      componentName +
      "&displayFor=" +
      displayfor +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    let headers = new HttpHeaders()
      .set("LnDUserId", "1001")
      .set("courseId", "0");
    return this.http.post(url, filterbody, { headers: headers });
  }

  //learner-performance
  getLearnerPerformanceData(filterbody) {
    let url =
      this.baseURL +
      APIURL.LEARNER_PERFORMANCE_PROGRESS +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-performance full details
  getLearnerPerformanceDetails(filterbody) {
    let url =
      this.baseURL +
      APIURL.LEARNER_PERFORMANCE_PROGRESS_DETAILS +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //org-interest
  getOrgInterestData() {
    let url =
      this.baseURL +
      APIURL.ORGANISATION_INTEREST +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-interest full details
  getOrgInterestDetailsData() {
    let url =
      this.baseURL +
      APIURL.ORGANISATION_INTEREST_DETAILS +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance trainers data
  getTeamData() {
    let url =
      this.baseURL +
      APIURL.TEAMS_LEADERBOARD +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance teams data
  getTrainersData() {
    let url =
      this.baseURL +
      APIURL.TRAINER_LEADERBOARD +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance leaners data
  getLearnerData() {
    let url =
      this.baseURL +
      APIURL.LEARNER_LEADERBOARD +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //scores-distribution based on component type
  getScoresDistrubution(componentName, filterbody) {
    let url =
      this.baseURL +
      APIURL.SCORES_DISTRUBUTION +
      "?type=" +
      componentName +
      "&start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //scores full-details
  getScoresDetails(dropdownValue, filterbody) {
    let url =
      this.baseURL +
      APIURL.SCORES_DISTRUBUTION_DETAILS +
      "?type=" +
      dropdownValue +
      "&start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //content-performing
  getContentData(filterbody) {
    let url =
      this.baseURL +
      APIURL.CONTENT_CONSUMPTION +
      "?start_date=" +
      this.start_date +
      "&end_date=" +
      this.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //get-filters
  getFiltersData(filtersList) {
    let filters = "";
    if (filtersList.length > 1) {
      for (let i in filtersList) filters += filtersList[i] + ",";
      filters = filters.slice(0, -1);
    }
    filters = filtersList[0];
    let url = this.baseURL + APIURL.FILTERS + "?type=" + filters;
    return this.http.get(url);
  }

  ngOnInit() {}
}
