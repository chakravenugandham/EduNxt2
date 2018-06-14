import { Component, OnInit } from "@angular/core";

import { LdDashboardService } from "../services/ld-dashboard.service";

@Component({
  selector: "app-learners-track-widget",
  templateUrl: "./learners-track-widget.component.html",
  styleUrls: ["./learners-track-widget.component.scss"]
})
export class LearnersTrackWidgetComponent implements OnInit {
  learnerPace: boolean = true;

  componentName: string = "pace";

  filterbody = {}
  getFilterObject($event){
    this.filterbody = $event; 
    console.log("this.filterbody",this.filterbody);
  }

  // routePath: string = "learnerTrackFullView";
  filtersData = {
    routeTo: "learnerTrackFullView",
    filters: true,
    search: false,
    filterList: ["zone"]
  };

  routerPath:string = "Praveen";

  widgetData = {
    pace: "",
    performance: ""
  };

  learnerPaceFn() {
    this.learnerPace = true;
    this.componentName = "pace";
    this.getData();
  }

  learnerPerfFn() {
    this.learnerPace = false;
    this.componentName = "performance";
    this.getData();
  }

  getData() {
    this.serviceData
      .getLearnerTrackData(this.componentName, this.filterbody)
      .subscribe((response: any) => {
        this.widgetData.pace = response.data.paceData;
        this.widgetData.performance = response.data.performanceData;
        
        // if (this.componentName == "pace") {
        //   this.widgetData.pace = response.data.paceData;
        // } else {
        //   this.widgetData.performance = response.data.performanceData;
        // }
      });
  }

  constructor(private serviceData: LdDashboardService) { }

  ngOnInit() {
    this.getData();
  }
}
