import { Component, OnInit } from '@angular/core';
import { LdDashboardService } from '../../services/ld-dashboard.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dashboardService: LdDashboardService) { }

  refreshReportFn() {
    this.dashboardService.refreshRepotAPI$.next();
  }

  ngOnInit() {
  }

}
