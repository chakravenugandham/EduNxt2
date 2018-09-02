import { Component, OnInit, Input } from "@angular/core";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";
import { NgbModal, ModalDismissReasons, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

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
  // sortOrder: string = "teamName";
  sortOrder: string;
  reverse: boolean = false;
  limitTo: number = 5;

  emailData = {
    to: "",
    subject: "Performance Review",
    text: ""
  }

  constructor(private dashboardService: LdDashboardService, private modalService: NgbModal) { }

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    this.reverse = !this.reverse;
  }

  open(content, type, personId) {
    this.dashboardService.getEmailAddress(personId).subscribe((response: any) => {
      this.emailData.to = response.data.email;
      if (type == "followup")
        this.emailData.text = "This mail is regarding the Follow up. Please have a look at your Performance";
      else if (type == "congrats")
        this.emailData.text = "Congratulations..! You did a great job on your performance. Keep going.";

      this.modalService.open(content).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.dashboardService.emailReportService(this.emailData).subscribe((response: any) => {
          });
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

    })
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
