import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs";
import { APIURL } from "../../apiURL";
import { DateserviceService } from "../../common-services/dateservice.service";
import { CommonService } from "../../common-services/common.service";

import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class LdDashboardService implements OnInit {
  dateFilterObj = {
    start_date: "",
    end_date: ""
  };
  LnDUserId: string;

  constructor(
    private http: HttpClient,
    private dateService: DateserviceService,
    private cookieService: CookieService
  ) {
    this.constructDate();
  }

  constructDate() {
    let today = new Date();
    this.dateFilterObj.end_date =
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    let last_date = new Date(today.setDate(today.getDate() - 30));
    this.dateFilterObj.start_date =
      last_date.getMonth() +
      1 +
      "/" +
      last_date.getDate() +
      "/" +
      last_date.getFullYear();
    return this.dateFilterObj;
  }

  refreshRepotAPI$ = new Subject<any>();

  get refreshReportAPI() {
    return this.refreshRepotAPI$.asObservable();
  }

  refreshAPI$ = new Subject<any>();

  get refreshAPI() {
    return this.refreshAPI$.asObservable();
  }

  tenantName$ = new Subject<any>();

  get tenantNameAPI() {
    return this.tenantName$.asObservable();
  }

  dateChange$ = new Subject<any>();

  get dateChangeAPI() {
    return this.dateChange$.asObservable();
  }

  //baseURL from enviornment
  baseURL = environment.baseUrl;
  UserId = (this.cookieService.get('LnDUserId') == '') ? '57142' : this.cookieService.get('LnDUserId')

  headers = new HttpHeaders()
    // .set("LnDUserId", "57142")
    .set("LnDUserId", this.UserId)
    .set("user-type", "LND")
    .set("tenant-name", "MAIT");

  selectTenantName(tenantName?: any) {
    if (tenantName == "MAIT") {
      this.headers = new HttpHeaders()
        // .set("LnDUserId", "57142")
        .set("LnDUserId", this.UserId)
        .set("user-type", "LND")
        .set("tenant-name", tenantName);
    }
    if (tenantName == "MAB") {
      this.headers = new HttpHeaders()
        .set("LnDUserId", "26642")
        .set("user-type", "LND")
        .set("tenant-name", tenantName);
    }
    if (tenantName == "HDFC") {
      this.headers = new HttpHeaders()
        .set("LnDUserId", "2")
        .set("user-type", "LND")
        .set("tenant-name", tenantName);
    }
    if (tenantName == "SMUDE") {
      this.headers = new HttpHeaders()
        .set("LnDUserId", "725440")
        .set("user-type", "LND")
        .set("tenant-name", tenantName);
    }
    this.tenantName$.next();
    this.refreshAPI$.next();
  }

  courseId = 0;
  programId = 0;

  courseAndProgram(config?: any) {
    let courseId, programId;
    for (let key in config) {
      courseId = config.courseId;
      programId = config.programId;
    }
    this.courseId = courseId;
    this.programId = programId;

    this.refreshAPI$.next();
  }

  //date change
  getDateChange() {
    this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
      "start_date"
    ];
    this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
      "end_date"
    ];
  }

  //courses dropdown
  getCoursesData() {
    let url = this.baseURL + APIURL.COURSES_DROPDOWN;
    return this.http.get(url, { headers: this.headers });
  }

  getActiveUsersWidgetData() {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }
    let url =
      this.baseURL +
      APIURL.ACTIVE_USERS +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.get(url, { headers: this.headers });
  }

  getEngagementWidgetData() {
    if ((this.dateService.dateFilterBodyDetails["start_date"]) && (this.dateService.dateFilterBodyDetails["end_date"])) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails["start_date"];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails["end_date"];
    }

    let url = this.baseURL + APIURL.LEARNER_ENGAGEMENT + "?start_date=" + this.dateFilterObj.start_date + "&end_date=" + this.dateFilterObj.end_date + "&courseId=" + this.courseId + "&programId=" + this.programId;
    return this.http.get(url, { headers: this.headers });
  }

  getPaceWidgetData() {
    if ((this.dateService.dateFilterBodyDetails["start_date"]) && (this.dateService.dateFilterBodyDetails["end_date"])) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails["start_date"];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails["end_date"];
    }

    let url =
      this.baseURL +
      APIURL.LEARNER_PACE +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.get(url, { headers: this.headers });
  }

  getFeedbackWidgetData() {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.FEEDBACK +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.get(url, { headers: this.headers });
  }

  getTimeSpentWidgetData() {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.TIME_SPENT +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.get(url, { headers: this.headers });
  }

  getUsersTrainedWidgetData() {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.USERS_TRAINED +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.get(url, { headers: this.headers });
  }

  //active users & mode of delivery data

  getActiveUsersData(filterbody) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.ACTIVE_USERS_GRAPH +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //location data

  getLocationData(filterbody) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.LOCATION +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-track widget data
  getLearnerTrackData(filterbody) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.LEARNER_PACE_PERFORMANCE +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    //let headers = new HttpHeaders().set("LnDUserId", "1001");
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-track full details
  getLearnerTrackDetails(componentName, displayfor, filterbody) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.LEARNER_PACE_PERFORMANCE_DETAILS +
      "?type=" +
      componentName +
      "&displayFor=" +
      displayfor +
      "&start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    //let headers = new HttpHeaders().set("LnDUserId", "1001");
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-performance
  getLearnerPerformanceData(tab) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.LEARNER_PERFORMANCE_PROGRESS +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId +
      "&type=" +
      tab;
    return this.http.get(url, { headers: this.headers });
  }

  //learner-performance full details
  getLearnerPerformanceDetails(filterbody) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.LEARNER_PERFORMANCE_PROGRESS_DETAILS +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //org-interest
  getOrgInterestData() {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.ORGANISATION_INTEREST +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.post(url, null, { headers: this.headers });
  }

  getOrgPopulatTopicsData() {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.ORGANISATION_POPULAR_TOPICS +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-interest full details
  getOrgInterestDetailsData() {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.ORGANISATION_INTEREST_DETAILS +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance trainers data
  getTeamData(limitTo) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.TEAMS_LEADERBOARD +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId +
      "&limit=" +
      limitTo;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance teams data
  getTrainersData(limitTo) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.TRAINER_LEADERBOARD +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId +
      "&limit=" +
      limitTo;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance leaners data
  getLearnerData(limitTo) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.LEARNER_LEADERBOARD +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId +
      "&limit=" +
      limitTo;
    return this.http.post(url, null, { headers: this.headers });
  }

  //scores-distribution based on component type
  getScoresDistrubution(componentName, filterbody) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.SCORES_DISTRUBUTION +
      "?type=" +
      componentName +
      "&start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //scores full-details
  getScoresDetails(dropdownValue, filterbody) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.SCORES_DISTRUBUTION_DETAILS +
      "?type=" +
      dropdownValue +
      "&start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //content-performing
  getContentData(filterbody, pagination) {
    if (
      this.dateService.dateFilterBodyDetails["start_date"] &&
      this.dateService.dateFilterBodyDetails["end_date"]
    ) {
      this.dateFilterObj.start_date = this.dateService.dateFilterBodyDetails[
        "start_date"
      ];
      this.dateFilterObj.end_date = this.dateService.dateFilterBodyDetails[
        "end_date"
      ];
    }

    let url =
      this.baseURL +
      APIURL.CONTENT_CONSUMPTION +
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId +
      "&page=" +
      pagination.page +
      "&limit=" +
      pagination.limitTo;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //get-filters
  getFiltersData(filtersList) {
    let filters = "";
    if (filtersList.length > 1) {
      for (let i in filtersList) filters += filtersList[i] + ",";
      filters = filters.slice(0, -1);
    } else {
      filters = filtersList[0];
    }

    let url =
      this.baseURL +
      APIURL.FILTERS +
      "?courseId=" +
      this.courseId +
      "&programId=" +
      this.programId +
      "&type=" +
      filters;
    return this.http.get(url, { headers: this.headers });
  }

  //getSearchFilterData
  getSearchFilterData(searchFilterData, searchTerm) {
    let url =
      this.baseURL +
      searchFilterData.searchComponent +
      "?courseId=" +
      this.courseId +
      "&programId=" +
      this.programId +
      "&searchBy=" +
      searchFilterData.searchBy +
      "&searchTerm=" +
      searchTerm;
    return this.http.post(url, null, { headers: this.headers });
  }

  logout() {
    let url = "http://172.24.1.53:8080/logout"
    return this.http.get(url, { headers: this.headers });
  }
  ngOnInit() { }
}
