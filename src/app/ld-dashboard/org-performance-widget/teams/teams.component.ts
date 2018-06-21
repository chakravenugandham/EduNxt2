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
  constructor(private getData: LdDashboardService) { }

  getDataFromService() {
    this.getData.getTeamData().subscribe((res: any) => {
      this.teamsData = res.data;
    });
  }

  ngOnInit() {
    this.getDataFromService();
  }
}

// export class teamDataConfig {
//   teamDataConfig: {
//     teamId: number;
//     teamName: string;
//     actionMessage: string;
//     completion: string;
//     completedProgram: string;
//     teamsize: string;
//   };
// }
