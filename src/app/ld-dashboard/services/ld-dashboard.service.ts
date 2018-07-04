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

  public dateChange = new Subject<any>();

  dateChange$ = this.dateChange.asObservable();

  refreshAPI$ = new Subject<any>();

  // start_date: string = "29/03/2018";
  // end_date: string = "29/06/2018";

  tempString = "";

  dateFilterObj = {
    start_date: "",
    end_date: ""
  };

  constructor(private http: HttpClient, private dateDetails: CommonService) {
    this.constructDate();
  }

  get refreshAPI() {
    return this.refreshAPI$.asObservable();
  }

  constructDate() {
    let today = new Date();
    this.dateFilterObj.end_date =
      // today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
      today.toLocaleDateString();

    let last_date = new Date(today.setDate(today.getDate() - 30));
    this.dateFilterObj.start_date =
      last_date.toLocaleDateString();
    // last_date.getDate() +
    // "/" +
    // (last_date.getMonth() + 1) +
    // "/" +
    // last_date.getFullYear();
    console.log("dateFilterObj", this.dateFilterObj);

    this.refreshAPI$.next();
    return this.dateFilterObj;
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

  getDateChange() {
    this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails["start_date"];
    this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails["end_date"];
    console.log(this.dateFilterObj.start_date, this.dateFilterObj.end_date);
    this.refreshAPI$.next();
  }

  //courses dropdown
  getCoursesData() {
    let url = this.baseURL + APIURL.COURSES_DROPDOWN;
    return this.http.get(url, { headers: this.headers1 });
  }

  getActiveUsersWidgetData() {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url = this.baseURL + APIURL.ACTIVE_USERS + "?start_date=" + this.dateFilterObj.start_date + "&end_date=" + this.dateFilterObj.end_date;
    return this.http.get(url, { headers: this.headers1 });
  }

  getEngagementWidgetData() {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url = this.baseURL + APIURL.LEARNER_ENGAGEMENT + "?start_date=" + this.dateFilterObj.start_date + "&end_date=" + this.dateFilterObj.end_date;
    return this.http.get(url, { headers: this.headers1 });
  }

  getPaceWidgetData() {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url = this.baseURL + APIURL.LEARNER_PACE + "?start_date=" + this.dateFilterObj.start_date + "&end_date=" + this.dateFilterObj.end_date;
    return this.http.get(url, { headers: this.headers1 });
  }

  getFeedbackWidgetData() {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url = this.baseURL + APIURL.FEEDBACK + "?start_date=" + this.dateFilterObj.start_date + "&end_date=" + this.dateFilterObj.end_date;
    return this.http.get(url, { headers: this.headers1 });
  }

  //first four widgets
  getActivityData() {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      "learning-activities" +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    console.log("start_date", this.dateFilterObj.start_date);
    console.log("end_date", this.dateFilterObj.end_date);

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
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    return this.http.get(url, { headers: this.headers1 });
  }

  //active users & mode of delivery data

  getActiveUsersData(filterbody) {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url = this.baseURL + APIURL.ACTIVE_USERS_GRAPH + "?start_date=" + this.dateFilterObj.start_date + "&end_date=" + this.dateFilterObj.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //location data

  getLocationData(filterbody) {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.LOCATION +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-track widget data
  getLearnerTrackData(filterbody) {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.LEARNER_PACE_PERFORMANCE +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    let headers = new HttpHeaders()
      .set("LnDUserId", "1001")
      .set("courseId", "0");
    return this.http.post(url, filterbody, { headers: headers });
  }

  //learner-track full details
  getLearnerTrackDetails(componentName, displayfor, filterbody) {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.LEARNER_PACE_PERFORMANCE_DETAILS +
      "?type=" +
      componentName +
      "&displayFor=" +
      displayfor +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    let headers = new HttpHeaders()
      .set("LnDUserId", "1001")
      .set("courseId", "0");
    return this.http.post(url, filterbody, { headers: headers });
  }

  //learner-performance
  getLearnerPerformanceData(filterbody) {

    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.LEARNER_PERFORMANCE_PROGRESS +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-performance full details
  getLearnerPerformanceDetails(filterbody) {

    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.LEARNER_PERFORMANCE_PROGRESS_DETAILS +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //org-interest
  getOrgInterestData() {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.ORGANISATION_INTEREST +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-interest full details
  getOrgInterestDetailsData() {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.ORGANISATION_INTEREST_DETAILS +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance trainers data
  getTeamData() {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.TEAMS_LEADERBOARD +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance teams data
  getTrainersData() {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.TRAINER_LEADERBOARD +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance leaners data
  getLearnerData() {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.LEARNER_LEADERBOARD +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    return this.http.post(url, null, { headers: this.headers });
  }

  //scores-distribution based on component type
  getScoresDistrubution(componentName, filterbody) {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.SCORES_DISTRUBUTION +
      "?type=" +
      componentName +
      "&start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //scores full-details
  getScoresDetails(dropdownValue, filterbody) {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.SCORES_DISTRUBUTION_DETAILS +
      "?type=" +
      dropdownValue +
      "&start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //content-performing
  getContentData(filterbody) {
    if ((this.dateDetails.dateFilterBodyDetails['start_date']) && (this.dateDetails.dateFilterBodyDetails['end_date'])) {
      this.dateFilterObj.start_date = this.dateDetails.dateFilterBodyDetails['start_date'];
      this.dateFilterObj.end_date = this.dateDetails.dateFilterBodyDetails['end_date'];
    }

    let url =
      this.baseURL +
      APIURL.CONTENT_CONSUMPTION +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date;
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

  ngOnInit() { }
}
