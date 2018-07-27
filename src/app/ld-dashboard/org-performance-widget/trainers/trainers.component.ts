import { Component, OnInit, Input } from "@angular/core";
import { LdDashboardService } from "../../../ld-dashboard/services/ld-dashboard.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-trainers",
  templateUrl: "./trainers.component.html",
  styleUrls: ["./trainers.component.scss"]
})
export class TrainersComponent implements OnInit {
  @Input() trainersData;
  // trainersData = [];
  sortOrder: string = "trainerName";
  limitTo: number = 5;
  closeResult: string;

  constructor(
    private getData: LdDashboardService,
    private modalService: NgbModal
  ) {
    this.getData.refreshAPI.subscribe(result => {
      // this.getDataFromService();
    });
  }

  open(Content) {
    this.modalService.open(Content).result.then(
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
  }

  // getDataFromService() {
  //   this.getData.getTrainersData(this.limitTo).subscribe((res: any) => {
  //     this.trainersData = res.data;
  //   });
  // }

  ngOnInit() {
    // this.getDataFromService();
  }
}
