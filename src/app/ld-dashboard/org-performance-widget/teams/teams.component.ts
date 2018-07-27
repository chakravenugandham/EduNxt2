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
      // this.getDataFromService();
    });
  }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  // getDataFromService() {
  //   this.getData.getTeamData(this.limitTo).subscribe((res: any) => {
  //     this.teamsData = res.data;
  //   });
  // }

  ngOnInit() {
    // this.getDataFromService();
  }
}
