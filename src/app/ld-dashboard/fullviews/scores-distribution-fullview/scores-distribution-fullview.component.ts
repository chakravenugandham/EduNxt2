import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from '../../services/ld-dashboard.service';
import { FilterWidgetComponent } from "../../common/filter-widget/filter-widget.component";

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

  getFilterObject($event) {
    this.filterbody = $event;
    this.getDataFromService();
  }
  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe((result) => {
      this.getDataFromService();
    })
  }
  //, this.filterbody
  getDataFromService() {
    this.getData.getScoresDetails(this.showDetails).subscribe((response: any) => {
      this.responseScoreDetails = response.data;
    });
    this.getData
      .getScoresDistrubution(this.showDetails, this.filterbody)
      .subscribe((res: any) => {
        this.responseGraphData = res.data;
        for (let i = 1; i <= this.responseGraphData.length; i++) {
          this.dataSet[i][1] = this.responseGraphData[i - 1].numberOfUsers;
        }
        this.dataSet = [...this.dataSet];
      });
  }


  //api call for score details based on component
  ngOnInit() {
    this.getDataFromService();
  }
}
