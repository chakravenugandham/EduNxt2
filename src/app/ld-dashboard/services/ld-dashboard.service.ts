import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { APIURL } from '../../apiURL';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LdDashboardService implements OnInit {
  dateFilterObj = {
    start_date: '',
    end_date: ''
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
  };

  program_course: string = '&programId=' + this.programObj.programId + '&courseId=' + this.programObj.courseId;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.constructDate();
  }

  constructDate() {
    const today = new Date();

    this.dateFilterObj.end_date = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
    const last_date = new Date(today.setDate(today.getDate() - 30));

    this.dateFilterObj.start_date = last_date.getMonth() + 1 + '/' + last_date.getDate() + '/' + last_date.getFullYear();

    this.setDateObj = '?start_date=' + this.dateFilterObj.start_date + '&end_date=' + this.dateFilterObj.end_date;

    return this.dateFilterObj;
  }

  changeInperformance$ = new Subject<any>();

  get changeInPerforamceAPI() {
    return this.changeInperformance$.asObservable();
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

  timeStamp$ = new Subject<any>();

  get timeStampAPI() {
    return this.timeStamp$.asObservable();
  }

  // baseURL from enviornment
  baseURL = environment.baseUrl;

  UserId = (this.cookieService.get('user_id') == '') ? '57142' : this.cookieService.get('user_id');
  tenantName = (this.cookieService.get('tenantName') == '') ? 'MAIT' : this.cookieService.get('tenantName');
  // UserId = this.cookieService.get('user_id');
  // tenantName = this.cookieService.get('tenantName');
  // UserId = '57142';
  // tenantName = 'MAIT';

  headers = new HttpHeaders()
    .set('user_id', this.UserId)
    .set('user_type', 'LND')
    .set('tenant_name', this.tenantName);

  selectTenantName(tenantName?: any) {
    if (tenantName === 'MAIT') {
      this.headers = new HttpHeaders()
        .set('user_id', '57142')
        .set('user_type', 'LND')
        .set('tenant_name', tenantName);
    }
    if (tenantName === 'MAB') {
      this.headers = new HttpHeaders()
        .set('user_id', '26642')
        .set('user_type', 'LND')
        .set('tenant_name', tenantName);
    }
    if (tenantName === 'HDFC') {
      this.headers = new HttpHeaders()
        .set('user_id', '2')
        .set('user_type', 'LND')
        .set('tenant_name', tenantName);
    }
    if (tenantName === 'SMUDE') {
      this.headers = new HttpHeaders()
        .set('user_id', '725440')
        .set('user_type', 'LND')
        .set('tenant_name', tenantName);
    }
    if (tenantName === 'PROLEARN') {
      this.headers = new HttpHeaders()
        .set('user_id', '95901')
        .set('user_type', 'LND')
        .set('tenant_name', tenantName);
    }
    this.refreshAPI$.next();
  }

  selectTenantNameV2(tenantName?: any, user_id?: any) {
    this.headers = new HttpHeaders()
      .set('user_id', user_id)
      .set('user_type', 'LND')
      .set('tenant_name', tenantName);
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

    this.program_course = '&programId=' + this.programObj.programId + '&courseId=' + this.programObj.courseId;

    this.refreshAPI$.next();
  }

  orgperformanceName = '';
  changeLeaderBoard(leaderBoardName) {
    this.orgperformanceName = leaderBoardName;
    return this.orgperformanceName;
  }

  changeDate(dateObj) {
    this.dateFilterObj.start_date = dateObj.start_date;
    this.dateFilterObj.end_date = dateObj.end_date;
    this.setDateObj = '?start_date=' + this.dateFilterObj.start_date + '&end_date=' + this.dateFilterObj.end_date;
  }

  // courses dropdown

  getCoursesProgramData() {
    const url = this.baseURL + APIURL.COURSES_PROGRAM_DROPDOWN + this.setDateObj;
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
    const url = this.baseURL + APIURL.ACTIVE_USERS + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getEngagementWidgetData() {
    const url = this.baseURL + APIURL.LEARNER_ENGAGEMENT + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getPaceWidgetData() {
    const url = this.baseURL + APIURL.LEARNER_PACE + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getFeedbackWidgetData() {
    const url = this.baseURL + APIURL.FEEDBACK + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getTimeSpentWidgetData() {
    const url = this.baseURL + APIURL.TIME_SPENT + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getUsersTrainedWidgetData() {
    const url = this.baseURL + APIURL.USERS_TRAINED + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  // active users , mode of delivery & location API

  getActiveUsersData() {
    const url = this.baseURL + APIURL.ACTIVE_USERS_GRAPH + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getModeOfDeliveryData() {
    const url = this.baseURL + APIURL.MODE_OF_DELIVERY + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getLocationData() {
    const url = this.baseURL + APIURL.LOCATION + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  // learner-track widget & view details API

  getLearnerTrackData(filterbody) {
    const url = this.baseURL + APIURL.LEARNER_PACE_PERFORMANCE + this.setDateObj + this.program_course;
    return this.http.post(url, filterbody, { headers: this.headers });
  }
  //
  getLearnerTrackDetails(componentName, displayfor, searchFilterData, searchTerm, filterbody, pagination, tracksortName, sort) {
    const url = this.baseURL + APIURL.LEARNER_PACE_PERFORMANCE_DETAILS + this.setDateObj + this.program_course + '&displayFor=' + displayfor + '&type=' + componentName + '&searchBy=' + searchFilterData.searchBy + '&searchTerm=' + searchTerm + '&page=' + pagination.page + '&limit=' + pagination.limitTo + '&sortBy=' + tracksortName + '&order=' + sort;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  // learner-performance & view details API
  getLearnerPerformanceData(tab) {
    const url = this.baseURL + APIURL.LEARNER_PERFORMANCE_PROGRESS + this.setDateObj + this.program_course + '&type=' + tab;
    return this.http.get(url, { headers: this.headers });
  }

  getLearnerPerformanceDetails(filterbody) {
    const url = this.baseURL + APIURL.LEARNER_PERFORMANCE_PROGRESS_DETAILS + this.setDateObj + '&courseId=' + this.courseId + '&programId=' +
      this.programId;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  // org-interest, popular topics & view details API
  getOrgInterestData() {
    const url = this.baseURL + APIURL.ORGANISATION_INTEREST + this.setDateObj + this.program_course;
    return this.http.post(url, null, { headers: this.headers });
  }

  getOrgPopulatTopicsData() {
    const url = this.baseURL + APIURL.ORGANISATION_POPULAR_TOPICS + this.setDateObj + this.program_course;
    return this.http.post(url, null, { headers: this.headers });
  }

  getOrgInterestDetailsData(searchFilterData, searchTerm, pagination, tracksortName, sort) {
    const url = this.baseURL + APIURL.ORGANISATION_INTEREST_DETAILS + this.setDateObj + this.program_course +
      '&searchBy=' + searchFilterData.searchBy + '&searchTerm=' + searchTerm + '&page=' +
      pagination.page + '&limit=' + pagination.limitTo + '&sortBy=' + tracksortName + '&order=' + sort;
    return this.http.post(url, null, { headers: this.headers });
  }

  //org-performance trainers, teams and learners data
  getPerformanceDetails(searchFilterData, searchTerm, pagination, tracksortName, sort) {
    let url = this.baseURL + searchFilterData.searchComponent + this.setDateObj + this.program_course + "&searchBy=" + searchFilterData.searchBy + "&searchTerm=" + searchTerm + "&page=" + pagination.page + "&limit=" + pagination.limitTo + "&sortBy=" + tracksortName + "&order=" + sort;
    return this.http.post(url, null, { headers: this.headers });
  }

  // scores-distribution based on component type
  getScoresDistrubution(componentName, filterbody) {
    const url = this.baseURL + APIURL.SCORES_DISTRUBUTION + this.setDateObj + '&type=' + componentName + this.program_course;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  // scores full-details
  getScoresDetails(dropdownValue, searchFilterData, searchTerm, filterbody, pagination, tracksortName, sort) {
    const url = this.baseURL + APIURL.SCORES_DISTRUBUTION_DETAILS + this.setDateObj + this.program_course +
      '&type=' + dropdownValue + '&searchBy=' + searchFilterData.searchBy + '&searchTerm=' + searchTerm +
      '&page=' + pagination.page + '&limit=' + pagination.limitTo + '&sortBy=' + tracksortName + '&order=' + sort;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  // content-performing
  getContentData(searchFilterData, searchTerm, filterbody, pagination, tracksortName, sort) {
    const url = this.baseURL + APIURL.CONTENT_CONSUMPTION + this.setDateObj + this.program_course +
      '&searchBy=' + searchFilterData.searchBy + '&searchTerm=' + searchTerm +
      '&page=' + pagination.page + '&limit=' + pagination.limitTo + '&sortBy=' + tracksortName + '&order=' + sort;
    return this.http.post(url, filterbody, { headers: this.headers });
  }

  // get-filters
  getFiltersData(filtersList) {
    let filters = '';
    if (filtersList.length > 1) {
      // tslint:disable-next-line:forin
      for (const i in filtersList) { filters += filtersList[i] + ','; }
      filters = filters.slice(0, -1);
    } else {
      filters = filtersList[0];
    }

    const url = this.baseURL + APIURL.FILTERS + this.setDateObj + this.program_course + '&type=' + filters;
    return this.http.get(url, { headers: this.headers });
  }

  // getSearchFilterData
  getSearchFilterData(searchFilterData, searchTerm) {
    const url = this.baseURL + searchFilterData.searchComponent + this.setDateObj + this.program_course + '&searchBy=' + searchFilterData.searchBy + '&searchTerm=' + searchTerm;
    return this.http.post(url, null, { headers: this.headers });
  }

  // email report

  emailReportService(emailBody) {
    const url = this.baseURL + APIURL.EMAIL_SERVICE;
    return this.http.post(url, emailBody, { headers: this.headers });
  }

  getEmailAddress(personId) {
    const url = this.baseURL + APIURL.GET_EMAIL + '?personId=' + personId;
    return this.http.get(url, { headers: this.headers });
  }

  // LOGOUT API
  logout() {
    const url = environment.logoutUrl;
    return this.http.get(url, { headers: this.headers });
  }

  // ORG-HEAD APIS

  getProgramStatus() {
    const url = this.baseURL + APIURL.PROGRAM_STATUS + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }


  getBestPrograms() {
    const url = this.baseURL + APIURL.BEST_PROGRAMS + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }

  getBestProgramsDetails() {
    const url = this.baseURL + APIURL.BEST_PROGRAMS_DETAILS + this.setDateObj + this.program_course;
    return this.http.get(url, { headers: this.headers });
  }


  // csv converted apis

  //active-users csv

  getActiveUsersCsv() {
    if (this.tenantName === 'MAIT') {
      this.UserId = '57142';
      return this.baseURL + APIURL.ACTIVE_USERS_GRAPH + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'MAB') {
      this.UserId = '26642';
      return this.baseURL + APIURL.ACTIVE_USERS_GRAPH + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'HDFC') {
      this.UserId = '2';
      return this.baseURL + APIURL.ACTIVE_USERS_GRAPH + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'SMUDE') {
      this.UserId = '725440';
      return this.baseURL + APIURL.ACTIVE_USERS_GRAPH + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'PROLEARN') {
      this.UserId = '95901';
      return this.baseURL + APIURL.ACTIVE_USERS_GRAPH + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
  }

  //mode-of-delivery csv
  getModeOfDeliveryCsv() {
    if (this.tenantName === 'MAIT') {
      this.UserId = '57142';
      return this.baseURL + APIURL.MODE_OF_DELIVERY + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'MAB') {
      this.UserId = '26642';
      return this.baseURL + APIURL.MODE_OF_DELIVERY + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'HDFC') {
      this.UserId = '2';
      return this.baseURL + APIURL.MODE_OF_DELIVERY + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'SMUDE') {
      this.UserId = '725440';
      return this.baseURL + APIURL.MODE_OF_DELIVERY + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'PROLEARN') {
      this.UserId = '95901';
      return this.baseURL + APIURL.MODE_OF_DELIVERY + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
  }

  //location details csv
  getLocationCsv() {

    if (this.tenantName === 'MAIT') {
      this.UserId = '57142';
      return this.baseURL + APIURL.LOCATION + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'MAB') {
      this.UserId = '26642';
      return this.baseURL + APIURL.LOCATION + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'HDFC') {
      this.UserId = '2';
      return this.baseURL + APIURL.LOCATION + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'SMUDE') {
      this.UserId = '725440';
      return this.baseURL + APIURL.LOCATION + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
    if (this.tenantName === 'PROLEARN') {
      this.UserId = '95901';
      return this.baseURL + APIURL.LOCATION + '/csv' + this.setDateObj + this.program_course + '&user_id=' + this.UserId + '&user_type=' + 'LND' + '&tenant_name=' + this.tenantName;
    }
  }

  // learner-track full details csv
  getLearnerTrackDetailsCsv(componentName, displayfor) {
    const url = this.baseURL + APIURL.LEARNER_PACE_PERFORMANCE_DETAILS + '/csv' + this.setDateObj + '&type=' + componentName + this.program_course + "&displayFor=" + displayfor;
    return this.http.post(url, null, { headers: this.headers });
  }

  //score-details full details csv
  getScoresDetailsCsv(dropdownValue) {
    const url = this.baseURL + APIURL.SCORES_DISTRUBUTION_DETAILS + '/csv' + this.setDateObj + '&type=' + dropdownValue + this.program_course;
    return this.http.post(url, null, { headers: this.headers });
  }

  //content-consumption full details csv
  getContentDetailsCsv() {
    const url = this.baseURL + APIURL.CONTENT_CONSUMPTION + '/csv' + this.setDateObj + this.program_course;
    return this.http.post(url, null, { headers: this.headers });
  }

  // org-interest full details csv
  getOrgInterestDetailsDataCsv() {
    const url = this.baseURL + APIURL.ORGANISATION_INTEREST_DETAILS + '/csv' + this.setDateObj + this.program_course;
    return this.http.post(url, null, { headers: this.headers });
  }

  // org-performance trainers data csv
  getTeamDataCsv() {
    const url = this.baseURL + APIURL.TEAMS_LEADERBOARD + '/csv' + this.setDateObj + this.program_course;
    return this.http.post(url, null, { headers: this.headers });
  }

  // org-performance teams data csv
  getTrainersDataCsv() {
    const url = this.baseURL + APIURL.TRAINER_LEADERBOARD + '/csv' + this.setDateObj + this.program_course;
    return this.http.post(url, null, { headers: this.headers });
  }

  // org-performance leaners data csv
  getLearnerDataCsv() {
    const url = this.baseURL + APIURL.LEARNER_LEADERBOARD + '/csv' + this.setDateObj + this.program_course;
    return this.http.post(url, null, { headers: this.headers });
  }

  //REFRESH time stamp 

  getRefreshTimeStamp(routepath) {
    const url = this.baseURL + APIURL.GET_TIME_STAMP + "?report=" + routepath;
    return this.http.get(url, { headers: this.headers });
  }

  ngOnInit() { }
}
