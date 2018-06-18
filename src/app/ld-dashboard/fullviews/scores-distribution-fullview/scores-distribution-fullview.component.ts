import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from '../../services/ld-dashboard.service';

@Component({
  selector: 'app-scores-distribution-fullview',
  templateUrl: './scores-distribution-fullview.component.html',
  styleUrls: ['./scores-distribution-fullview.component.scss']
})
export class ScoresDistributionFullviewComponent implements OnInit {

  responseScoreDetails: any;
  //getValue: string = "test";

  dataSet = [[0, 0], [20, 100], [40, 600], [60, 1000], [80, 600], [100, 100], [110, 0]];
  showDetails: string = "test";

  constructor(private getData: LdDashboardService) { }

  ngOnInit() {
    this.getData.getScoresDetails(this.showDetails).subscribe((response: any) => {
      this.responseScoreDetails = response.data;
      console.log(this.responseScoreDetails);
    });
  }

}
