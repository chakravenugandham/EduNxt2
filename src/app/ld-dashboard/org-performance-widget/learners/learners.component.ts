import { Component, OnInit, Input } from "@angular/core";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-learners",
  templateUrl: "./learners.component.html",
  styleUrls: ["./learners.component.scss"]
})
export class LearnersComponent implements OnInit {
  @Input() LearnersData;
  // LearnersData = [];
  closeResult: string;
  // LearnersData = [];
  parseFloat = parseFloat;
  limitTo: number = 5;

  sortOrder: string = "pointsEarned";
  // sortOrder: string;
  reverse: boolean = false;

  constructor(
    private getData: LdDashboardService,
    private modalService: NgbModal) { }

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

  sortByFn(sortByName) {
    this.sortOrder = sortByName;
    this.reverse = !this.reverse;
  }

  // getDataFromService() {
  //   this.getData.getLearnerData(this.limitTo).subscribe((res: any) => {
  //     this.LearnersData = res.data;
  //   });
  // }

  ngOnInit() {
    // this.getDataFromService();
  }
}
