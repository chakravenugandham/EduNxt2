import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-interest-widget',
  templateUrl: './org-interest-widget.component.html',
  styleUrls: ['./org-interest-widget.component.scss']
})
export class OrgInterestWidgetComponent implements OnInit {
  routePath: string = "orgInterestFullView";
  filtersData: {
    routeTo: "orgInterestFullView",
    filters: true,
    search: false,
    filterList: ["zone"]
  };
  constructor() { }

  ngOnInit() {
  }

}
