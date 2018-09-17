import { Component, OnInit } from "@angular/core";
import { LdDashboardService } from "./services/ld-dashboard.service";

@Component({
  selector: "app-ld-dashboard",
  templateUrl: "./ld-dashboard.component.html",
  styleUrls: ["./ld-dashboard.component.scss"]
})
export class LdDashboardComponent implements OnInit {
  filtersList = [];

  loading: boolean = false;
  constructor(private getDataService: LdDashboardService) { }

  ngOnInit() { }
}
