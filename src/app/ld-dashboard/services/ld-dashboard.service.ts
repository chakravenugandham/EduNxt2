import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs";
import { APIURL } from "../../apiURL";
import { DateserviceService } from "../../common-services/dateservice.service";

@Injectable({
  providedIn: "root"
})
export class LdDashboardService implements OnInit {
  dateFilterObj = {
    start_date: "",
    end_date: ""
  };

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

  refreshAPI$ = new Subject<any>();

  get refreshAPI() {
    return this.refreshAPI$.asObservable();
  }

  dateChange$ = new Subject<any>();

  get dateChangeAPI() {
    return this.dateChange$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private dateService: DateserviceService
  ) {
    this.constructDate();
  }

  // .set("courseId", "0")
  //   .set("programId", "0")
  //baseURL from enviornment
  baseURL = environment.baseUrl;
  headers = new HttpHeaders()
    .set("LnDUserId", "57142")
    .set("user-type", "LND")
    .set("tenant-name", "MAIT");
  // headers1 = new HttpHeaders()
  //   .set("LnDUserId", "57142")
  //   .set("user-type", "LND")
  //   .set("tenant-name", "MAIT");

  courseId = 0;
  programId = 0;

  courseAndProgram(config?: any) {
    let courseId;
    let programId;
    for (let key in config) {
      courseId = config.courseId;
      programId = config.programId;
    }
    this.courseId = courseId;
    this.programId = programId;

    this.refreshAPI$.next();
  }

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
    return this.http.get(url);
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
      APIURL.LEARNER_ENGAGEMENT +
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

  getPaceWidgetData() {
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
    let headers = new HttpHeaders().set("LnDUserId", "1001");
    return this.http.post(url, filterbody, { headers: headers });
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
      "?start_date=" +
      this.dateFilterObj.start_date +
      "&end_date=" +
      this.dateFilterObj.end_date +
      "&courseId=" +
      this.courseId +
      "&programId=" +
      this.programId;
    let headers = new HttpHeaders().set("LnDUserId", "1001");
    return this.http.post(url, filterbody, { headers: headers });
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
      this.programId + "&type=" + tab;
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
  getTeamData() {
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
      this.programId;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance teams data
  getTrainersData() {
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
      this.programId;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance leaners data
  getLearnerData() {
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
      this.programId;
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
  getContentData(filterbody) {
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
      this.programId;
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
