import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LdDashboardService } from '../../services/ld-dashboard.service';

@Component({
  selector: 'app-learner-track-fullview',
  templateUrl: './learner-track-fullview.component.html',
  styleUrls: ['./learner-track-fullview.component.scss']
})
export class LearnerTrackFullviewComponent implements OnInit {
  responseTrackDetails: any;
  responseGraphDetails: any;
  constructor(private getData: LdDashboardService) { }

  getDataFromService() {
    this.getData.getLearnerTrackDetails().subscribe((response: any) => {
      this.responseTrackDetails = response.data;
    });
    this.getData.getGraphDetails().subscribe((res: any) => {
      this.responseGraphDetails = res.data;
    });
  }

  ngOnInit() {
    this.getDataFromService();
    console.log(this.responseGraphDetails, this.responseTrackDetails);
  }

}
