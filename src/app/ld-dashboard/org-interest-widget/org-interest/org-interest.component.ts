import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';

import { LdDashboardService } from '../../../ld-dashboard/services/ld-dashboard.service';

@Component({
  selector: 'app-org-interest',
  templateUrl: './org-interest.component.html',
  styleUrls: ['./org-interest.component.scss']
})
export class OrgInterestComponent implements OnInit, OnChanges {
  @Input() orgInterestData: any[];
  @Input() orgPopularData: any[];

  options: CloudOptions = {
    width: 400,
    height: 400,
    overflow: false
  };

  wordData = [];
  data: CloudData[];
  constructor(private getData: LdDashboardService) { }

  ngOnChanges(changes: any) {
    if (changes.orgPopularData && changes.orgPopularData.currentValue) {
      this.options.width = document.getElementById('word-cloud').offsetWidth;

      this.wordData = [];
      // tslint:disable-next-line:forin
      for (const i in this.orgPopularData) {
        this.wordData.push({
          text: this.orgPopularData[i].interest.slice(0, 20) + '..',
          weight: this.orgPopularData[i].rank
        });
      }
      const myObservable: Observable<CloudData[]> = observableOf(this.wordData);
      myObservable.subscribe(res => (this.data = res));
    }
  }

  ngOnInit() { }
}
