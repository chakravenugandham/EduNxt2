import { Component, OnInit, AfterViewChecked, AfterViewInit, DoCheck } from '@angular/core';
import { LdDashboardService } from '../../services/ld-dashboard.service';

@Component({
  selector: 'app-org-performance-fullview',
  templateUrl: './org-performance-fullview.component.html',
  styleUrls: ['./org-performance-fullview.component.scss']
})
export class OrgPerformanceFullviewComponent implements OnInit {

  responseTeamsDetails: any;
  responseTrainersDetails: any;
  responseLeanersDetails: any;

  showDetails: string = "teams";

  // teams: boolean = true;
  // trainers: boolean = false;
  // learners: boolean = false;

  constructor(private getData: LdDashboardService) { }

  // getDataFromService(event) {
  //   this.showDetails = event;


  // }

  ngOnChanges(changes: any) {
    if (changes.showDetails.currentValue) {
      //this.getDataFromService();
    }

  }

  ngOnInit() {
    this.getData.getTrainersData().subscribe((response: any) => {
      this.responseTrainersDetails = response.data;
      console.log(this.responseTrainersDetails);
    });
    this.getData.getTeamData().subscribe((response: any) => {
      this.responseTeamsDetails = response.data;
      console.log(this.responseTeamsDetails);
    });
    this.getData.getLearnerData().subscribe((response: any) => {
      this.responseLeanersDetails = response.data;
      console.log(this.responseLeanersDetails);
    });
  }

}
