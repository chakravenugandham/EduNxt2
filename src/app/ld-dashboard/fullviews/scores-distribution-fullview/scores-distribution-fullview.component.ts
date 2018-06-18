import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from '../../services/ld-dashboard.service';

@Component({
  selector: 'app-scores-distribution-fullview',
  templateUrl: './scores-distribution-fullview.component.html',
  styleUrls: ['./scores-distribution-fullview.component.scss']
})
export class ScoresDistributionFullviewComponent implements OnInit {

  responseScoreDetails: any;
  responseGraphData: any;

  dataSet = [[0, 0], [20], [40], [60], [80], [100], [110, 0]];
  //[[0, 0], [20, 100], [40, 600], [60, 1000], [80, 600], [100, 100], [110, 0]];
  showDetails: string = "test";

  filterbody = {};
  constructor(private getData: LdDashboardService) { }

  getFilterObject($event) {
    this.filterbody = $event;
    //this.getDataFromService();
  }


  //api call for score details based on component
  ngOnInit() {
    this.getData.getScoresDetails(this.showDetails).subscribe((response: any) => {
      this.responseScoreDetails = response.data;
      for (let i = 1; i <= this.responseScoreDetails.length; i++) {

        this.dataSet[i][1] = this.responseScoreDetails[i - 1].numberOfUsers;
      }
    });

    this.getData
      .getScoresDistrubution(this.showDetails, this.filterbody)
      .subscribe((response: any) => {
        this.responseGraphData = response.data;
        //console.log(this.responseGraphData);
        for (let i = 1; i <= this.responseGraphData.length; i++) {
          console.log(this.responseScoreDetails[i - 1]);
          this.dataSet[i][1] = this.responseGraphData[i - 1].numberOfUsers;
          //console.log(this.dataSet);
        }
      });
  }

}
