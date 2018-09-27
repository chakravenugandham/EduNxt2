import { TestBed, inject } from '@angular/core/testing';

import { LdDashboardService } from './ld-dashboard.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

describe('LdDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdDashboardService, CookieService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([LdDashboardService], (service: LdDashboardService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created constructDate', inject([LdDashboardService], (service: LdDashboardService) => {
    service.constructDate();
    expect(service.constructDate).toBeTruthy();
  }));

  it('should be created selectTenantName', inject([LdDashboardService], (service: LdDashboardService) => {
    service.selectTenantName();
    expect(service.selectTenantName).toBeTruthy();
  }));

  it('should be created selectTenantNameV2', inject([LdDashboardService], (service: LdDashboardService) => {
    service.selectTenantNameV2();
    expect(service.selectTenantNameV2).toBeTruthy();
  }));

  xit('should be created courseAndProgram', inject([LdDashboardService], (service: LdDashboardService) => {
    service.courseAndProgram();
    expect(service.courseAndProgram).toBeTruthy();
  }));

  it('should be created changeLeaderBoard', inject([LdDashboardService], (service: LdDashboardService) => {
    let leaderBoardName;
    service.changeLeaderBoard(leaderBoardName);
    expect(service.changeLeaderBoard).toBeTruthy();
  }));

  it('should be created changeDate', inject([LdDashboardService], (service: LdDashboardService) => {
    let dateObj = {
      start_date: '',
      end_date: ''
    };
    service.changeDate(dateObj);
    expect(service.changeDate).toBeTruthy();
  }));

  it('should be created getCoursesProgramData', inject([LdDashboardService], (service: LdDashboardService) => {
    service.getCoursesProgramData();
    expect(service.getCoursesProgramData).toBeTruthy();
  }));

  it('should be created getLearnerPerformanceDetails', inject([LdDashboardService], (service: LdDashboardService) => {
    let filterbody;
    service.getLearnerPerformanceDetails(filterbody);
    expect(service.getLearnerPerformanceDetails).toBeTruthy();
  }));

  it('should be created getFiltersData', inject([LdDashboardService], (service: LdDashboardService) => {
    let filtersList = [];
    service.getFiltersData(filtersList);
    expect(service.getFiltersData).toBeTruthy();
  }));

  it('should be created getSearchFilterData', inject([LdDashboardService], (service: LdDashboardService) => {
    let searchFilterData = {
      searchBy: ''
    };
    let searchTerm;
    service.getSearchFilterData(searchFilterData, searchTerm);
    expect(service.getSearchFilterData).toBeTruthy();
  }));

  it('should be created emailReportService', inject([LdDashboardService], (service: LdDashboardService) => {
    let filterbody;
    service.emailReportService(filterbody);
    expect(service.emailReportService).toBeTruthy();
  }));

  it('should be created logout', inject([LdDashboardService], (service: LdDashboardService) => {
    service.logout();
    expect(service.logout).toBeTruthy();
  }));

  it('should be created getActiveUsersCsv', inject([LdDashboardService], (service: LdDashboardService) => {
    service.getActiveUsersCsv();
    expect(service.getActiveUsersCsv).toBeTruthy();
  }));

  it('should be created getModeOfDeliveryCsv', inject([LdDashboardService], (service: LdDashboardService) => {
    service.getModeOfDeliveryCsv();
    expect(service.getModeOfDeliveryCsv).toBeTruthy();
  }));

  it('should be created getLocationCsv', inject([LdDashboardService], (service: LdDashboardService) => {
    service.getLocationCsv();
    expect(service.getLocationCsv).toBeTruthy();
  }));

  it('should be created getLearnerTrackDetailsCsv', inject([LdDashboardService], (service: LdDashboardService) => {
    let componentName, displayfor;
    service.getLearnerTrackDetailsCsv(componentName, displayfor);
    expect(service.getLearnerTrackDetailsCsv).toBeTruthy();
  }));

  it('should be created getScoresDetailsCsv', inject([LdDashboardService], (service: LdDashboardService) => {
    let dropdownValue;
    service.getScoresDetailsCsv(dropdownValue);
    expect(service.getScoresDetailsCsv).toBeTruthy();
  }));

  it('should be created getContentDetailsCsv', inject([LdDashboardService], (service: LdDashboardService) => {
    service.getContentDetailsCsv();
    expect(service.getContentDetailsCsv).toBeTruthy();
  }));

  it('should be created getOrgInterestDetailsDataCsv', inject([LdDashboardService], (service: LdDashboardService) => {
    service.getOrgInterestDetailsDataCsv();
    expect(service.getOrgInterestDetailsDataCsv).toBeTruthy();
  }));

  it('should be created getTeamDataCsv', inject([LdDashboardService], (service: LdDashboardService) => {
    service.getTeamDataCsv();
    expect(service.getTeamDataCsv).toBeTruthy();
  }));

  it('should be created getTrainersDataCsv', inject([LdDashboardService], (service: LdDashboardService) => {
    service.getTrainersDataCsv();
    expect(service.getTrainersDataCsv).toBeTruthy();
  }));

  it('should be created getLearnerDataCsv', inject([LdDashboardService], (service: LdDashboardService) => {
    service.getLearnerDataCsv();
    expect(service.getLearnerDataCsv).toBeTruthy();
  }));
});
