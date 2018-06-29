import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.scss"]
})
export class TeamsComponent implements OnInit {
  teamsData: any[];
  sortType: string = "";
  parseFloat = parseFloat;
  order: string;
  constructor(private getData: LdDashboardService) {
    this.getData.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  getDataFromService() {
    this.getData.getTeamData().subscribe((res: any) => {
      this.teamsData = res.data;
      // this.order = this.teamsData.teamName;
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}
