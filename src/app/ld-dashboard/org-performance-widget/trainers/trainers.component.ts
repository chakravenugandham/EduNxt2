import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-trainers",
  templateUrl: "./trainers.component.html",
  styleUrls: ["./trainers.component.scss"]
})
export class TrainersComponent implements OnInit {
  @Input() trainersData;

  @Output() sortBy = new EventEmitter<any>();

  sortOrder: string = "trainerName";

  limitTo: number = 5;
  closeResult: string;

  emailData = {
    to: "",
    subject: "Performance Review",
    text: ""
  }

  constructor(private dashboardService: LdDashboardService, private modalService: NgbModal) { }

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

  composeEmail(type, personId) {
    this.dashboardService.getEmailAddress(personId).subscribe((response: any) => {
      this.emailData.to = response.data.email;

      if (type == "followup")
        this.emailData.text = "This mail is regarding the Follow up. Please have a look at your Performance";
      else if (type == "congrats")
        this.emailData.text = "Congratulations..! You did a great job on your performance. Keep going.";

      window.open("mailto:" + this.emailData.to + "?subject=" + this.emailData.subject + "&body=" + this.emailData.text, "_self");
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

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    this.sortBy.emit(this.sortOrder);
  }

  ngOnInit() {
  }
}
