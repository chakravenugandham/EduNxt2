import { Component, OnInit, Input } from "@angular/core";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.scss"]
})
export class TeamsComponent implements OnInit {
  @Input() teamsData;
  closeResult: string;
  // teamsData: any[];
  sortType: string = "";
  parseFloat = parseFloat;
  sortOrder: string = "teamName";
  limitTo: number = 5;

  constructor(
    private getData: LdDashboardService,
    private modalService: NgbModal
  ) {
    this.getData.refreshAPI.subscribe(result => {
      this.getDataFromService();
    });
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
  }

  getDataFromService() {
    this.getData.getTeamData(this.limitTo).subscribe((res: any) => {
      this.teamsData = res.data;
      // this.order = this.teamsData.teamName;
    });
  }

  ngOnInit() {
    // this.getDataFromService();
  }
}
