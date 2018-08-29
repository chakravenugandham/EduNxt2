import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs";
import { APIURL } from "../../apiURL";
import { DateserviceService } from "../../common-services/dateservice.service";

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
  setDateObj: string;
  courseId = 0;
  programId = 0;

  programObj = {
    programId: 0,
    courseId: 0,
    batchId: 0,
    sectionId: 0
  }

  program_course: string = "&programId=" + this.programObj.programId + "&courseId=" + this.programObj.courseId;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.constructDate();
  }

  constructDate() {
    let today = new Date();

    this.dateFilterObj.end_date = today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    let last_date = new Date(today.setDate(today.getDate() - 30));

    this.dateFilterObj.start_date = last_date.getMonth() + 1 + "/" + last_date.getDate() + "/" + last_date.getFullYear();

    this.setDateObj = "?start_date=" + this.dateFilterObj.start_date + "&end_date=" + this.dateFilterObj.end_date;

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

  // UserId = this.cookieService.get('user_id');
  UserId = "57142";

  headers = new HttpHeaders()
    .set("user_id", this.UserId)
    .set("user_type", "LND")
    .set("tenant_name", "MAIT");

  selectTenantName(tenantName?: any) {
    if (tenantName == "MAIT") {
      this.headers = new HttpHeaders()
        .set("user_id", "57142")
        .set("user_type", "LND")
        .set("tenant_name", tenantName);
    }
    if (tenantName == "MAB") {
      this.headers = new HttpHeaders()
        .set("user_id", "26642")
        .set("user_type", "LND")
        .set("tenant_name", tenantName);
    }
    if (tenantName == "HDFC") {
      this.headers = new HttpHeaders()
        .set("user_id", "2")
        .set("user_type", "LND")
        .set("tenant_name", tenantName);
    }
    if (tenantName == "SMUDE") {
      this.headers = new HttpHeaders()
        .set("user_id", "725440")
        .set("user_type", "LND")
        .set("tenant_name", tenantName);
    }
    if (tenantName == "PROLEARN") {
      this.headers = new HttpHeaders()
        .set("user_id", "95901")
        .set("user_type", "LND")
        .set("tenant_name", tenantName);
    }
    if (tenantName == "PROLEARN") {
      this.headers = new HttpHeaders()
        .set("user_id", "95901")
        .set("user_type", "LND")
        .set("tenant_name", tenantName);
    }
    this.tenantName$.next();
    this.refreshAPI$.next();
  }

  courseAndProgram(config?: any) {

    this.programObj.programId = config.programId;
    this.programObj.courseId = config.courseId;
    this.programObj.batchId = config.batchId;
    this.programObj.sectionId = config.sectionId;

    this.courseId = config.courseId;
    this.programId = config.programId;

    this.program_course = "&programId=" + this.programObj.programId + "&courseId=" + this.programObj.courseId;

    this.refreshAPI$.next();
  }

  changeDate(dateObj) {
    this.dateFilterObj.start_date = dateObj.start_date;
    this.dateFilterObj.end_date = dateObj.end_date;
    this.setDateObj = "?start_date=" + this.dateFilterObj.start_date + "&end_date=" + this.dateFilterObj.end_date;
  }


  //courses dropdown

  getCoursesProgramData() {
    let url = this.baseURL + APIURL.COURSES_PROGRAM_DROPDOWN;
    return this.http.get(url, { headers: this.headers });
  }

  // getProgramData() {
  //   let url = this.baseURL + APIURL.PROGRAM_DROPDOWN;
  //   return this.http.get(url, { headers: this.headers });
  // }

  // getCoursesData(programId) {
  //   let url = this.baseURL + APIURL.COURSES_DROPDOWN + "?programId=" + programId;
  //   return this.http.get(url, { headers: this.headers });
  // }

  // getBatchesData(programId, courseId) {
  //   let url = this.baseURL + APIURL.BATCHES_DROPDOWN + "?programId=" + programId + "&courseId" + courseId;
  //   return this.http.get(url, { headers: this.headers });
  // }

  // getSectionsData(programId, courseId, batchId) {
  //   let url = this.baseURL + APIURL.SECTIONS_DROPDOWN + "?programId=" + programId + "&courseId" + courseId + "&batch=" + batchId + this.setDateObj;
  //   return this.http.get(url, { headers: this.headers });
  // }

  getActiveUsersWidgetData() {
    let url = this.baseURL + APIURL.ACTIVE_USERS + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getEngagementWidgetData() {
    let url = this.baseURL + APIURL.LEARNER_ENGAGEMENT + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getPaceWidgetData() {
    let url = this.baseURL + APIURL.LEARNER_PACE + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getFeedbackWidgetData() {
    let url = this.baseURL + APIURL.FEEDBACK + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getTimeSpentWidgetData() {
    let url = this.baseURL + APIURL.TIME_SPENT + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getUsersTrainedWidgetData() {
    let url = this.baseURL + APIURL.USERS_TRAINED + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  //active users , mode of delivery & location API

  getActiveUsersData() {
    let url = this.baseURL + APIURL.ACTIVE_USERS_GRAPH + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getModeOfDeliveryData() {
    let url = this.baseURL + APIURL.MODE_OF_DELIVERY + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getLocationData() {
    let url = this.baseURL + APIURL.LOCATION + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  //learner-track widget & view details API

  getLearnerTrackData(filterbody) {
    let url = this.baseURL + APIURL.LEARNER_PACE_PERFORMANCE + this.setDateObj + this.program_course;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  getLearnerTrackDetails(componentName, displayfor, searchFilterData, searchTerm, filterbody, pagination) {
    let url = this.baseURL + APIURL.LEARNER_PACE_PERFORMANCE_DETAILS + this.setDateObj + this.program_course + "&displayFor=" + displayfor + "&type=" + componentName + "&searchBy=" + searchFilterData.searchBy + "&searchTerm=" + searchTerm + "&page=" + pagination.page + "&limit=" + pagination.limitTo;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //learner-performance & view details API
  getLearnerPerformanceData(tab) {
    let url = this.baseURL + APIURL.LEARNER_PERFORMANCE_PROGRESS + this.setDateObj + this.program_course + "&type=" + tab;
    return this.http.get(url, { headers: this.headers });
  }

  getLearnerPerformanceDetails(filterbody) {
    let url = this.baseURL + APIURL.LEARNER_PERFORMANCE_PROGRESS_DETAILS + this.setDateObj + "&courseId=" + this.courseId + "&programId=" +
      this.programId;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //org-interest, popular topics & view details API
  getOrgInterestData() {
    let url = this.baseURL + APIURL.ORGANISATION_INTEREST + this.setDateObj + this.program_course;
    return this.http.post(url, null, { headers: this.headers });
  }

  getOrgPopulatTopicsData() {
    let url = this.baseURL + APIURL.ORGANISATION_POPULAR_TOPICS + this.setDateObj + this.program_course;
    return this.http.post(url, null, { headers: this.headers });
  }

  getOrgInterestDetailsData(searchFilterData, searchTerm, pagination) {
    let url = this.baseURL + APIURL.ORGANISATION_INTEREST_DETAILS + this.setDateObj + this.program_course + "&searchBy=" + searchFilterData.searchBy + "&searchTerm=" + searchTerm + "&page=" + pagination.page + "&limit=" + pagination.limitTo;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance trainers, teams and learners data
  getPerformanceDetails(searchFilterData, searchTerm, pagination) {
    let url = this.baseURL + searchFilterData.searchComponent + this.setDateObj + this.program_course + "&searchBy=" + searchFilterData.searchBy + "&searchTerm=" + searchTerm + "&page=" + pagination.page + "&limit=" + pagination.limitTo;
    return this.http.post(url, null, { headers: this.headers });
  }

  //scores-distribution based on component type
  getScoresDistrubution(componentName, filterbody) {
    let url = this.baseURL + APIURL.SCORES_DISTRUBUTION + this.setDateObj + "&type=" + componentName + this.program_course;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //scores full-details
  getScoresDetails(dropdownValue, searchFilterData, searchTerm, filterbody, pagination) {
    let url = this.baseURL + APIURL.SCORES_DISTRUBUTION_DETAILS + this.setDateObj + "&type=" + dropdownValue + this.program_course + "&searchBy=" + searchFilterData.searchBy + "&searchTerm=" + searchTerm + "&page=" + pagination.page + "&limit=" + pagination.limitTo;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  //content-performing
  getContentData(searchFilterData, searchTerm, filterbody, pagination) {
    let url = this.baseURL + APIURL.CONTENT_CONSUMPTION + this.setDateObj + this.program_course + "&searchBy=" + searchFilterData.searchBy + "&searchTerm=" + searchTerm + "&page=" + pagination.page + "&limit=" + pagination.limitTo;
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

    let url = this.baseURL + APIURL.FILTERS + "?courseId=" + this.courseId + "&programId=" + this.programId + "&type=" + filters;
    return this.http.get(url, { headers: this.headers });
  }

  //getSearchFilterData
  getSearchFilterData(searchFilterData, searchTerm) {
    let url = this.baseURL + searchFilterData.searchComponent + this.setDateObj + this.program_course + "&searchBy=" + searchFilterData.searchBy + "&searchTerm=" + searchTerm;
    return this.http.post(url, null, { headers: this.headers });
  }

  //email report

  emailReportService(emailBody) {
    let url = this.baseURL + APIURL.EMAIL_SERVICE;
    return this.http.post(url, emailBody, { headers: this.headers });
  }

  //LOGOUT API
  logout() {
    let url = environment.logoutUrl;
    return this.http.get(url, { headers: this.headers });
  }

  //ORG-HEAD APIS 

  getProgramStatus() {
    let url = this.baseURL + APIURL.PROGRAM_STATUS + this.setDateObj + this.program_course
    return this.http.get(url, { headers: this.headers });
  }


  getBestPrograms() {
    let url = this.baseURL + APIURL.BEST_PROGRAMS + this.setDateObj + this.program_course
    return this.http.get(url, { headers: this.headers });
  }

  getBestProgramsDetails() {
    let url = this.baseURL + APIURL.BEST_PROGRAMS_DETAILS + this.setDateObj + this.program_course
    return this.http.get(url, { headers: this.headers });
  }


  //csv converted apis

  //learner-track full details
  getLearnerTrackDetailsCsv(componentName) {
    let url = this.baseURL + APIURL.LEARNER_PACE_PERFORMANCE_DETAILS + '/csv' + this.setDateObj + "&type=" + componentName + this.program_course + "&user_id=" + this.UserId + "&user_type=" + "LND" + "&tenant_name=" + "MAIT";
    //"&displayFor=" + displayfor +
    return this.http.post(url, null, { headers: this.headers });
  }

  getScoresDetailsCsv(dropdownValue) {
    let url = this.baseURL + APIURL.SCORES_DISTRUBUTION_DETAILS + '/csv' + this.setDateObj + "&type=" + dropdownValue + this.program_course + "&user_id=" + this.UserId + "&user_type=" + "LND" + "&tenant_name=" + "MAIT";
    return this.http.post(url, null, { headers: this.headers });
  }

  getContentDetailsCsv() {
    let url = this.baseURL + APIURL.CONTENT_CONSUMPTION + "/csv" + this.setDateObj + this.program_course + "&user_id=" + this.UserId + "&user_type=" + "LND" + "&tenant_name=" + "MAIT";
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-interest full details
  getOrgInterestDetailsDataCsv() {
    let url = this.baseURL + APIURL.ORGANISATION_INTEREST_DETAILS + "/csv" + this.setDateObj + this.program_course + "&user_id=" + this.UserId + "&user_type=" + "LND" + "&tenant_name=" + "MAIT";
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance trainers data
  getTeamDataCsv() {
    let url = this.baseURL + APIURL.TEAMS_LEADERBOARD + "/csv" + this.setDateObj + this.program_course + "&user_id=" + this.UserId + "&user_type=" + "LND" + "&tenant_name=" + "MAIT";
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance teams data
  getTrainersDataCsv() {
    let url = this.baseURL + APIURL.TRAINER_LEADERBOARD + "/csv" + this.setDateObj + this.program_course + "&user_id=" + this.UserId + "&user_type=" + "LND" + "&tenant_name=" + "MAIT";
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance leaners data
  getLearnerDataCsv() {
    let url = this.baseURL + APIURL.LEARNER_LEADERBOARD + "/csv" + this.setDateObj + this.program_course + "&user_id=" + this.UserId + "&user_type=" + "LND" + "&tenant_name=" + "MAIT";
    return this.http.post(url, null, { headers: this.headers });
  }

  ngOnInit() { }
}
