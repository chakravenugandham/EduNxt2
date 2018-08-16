import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit, OnChanges {
  @Input() pageInfo: any;
  @Output() gotoPage = new EventEmitter<any>();
  // selectPage: number = 1;
  constructor() { }

  loadPage(event) {
    this.pageInfo.page = event > Math.ceil(this.pageInfo.total / 10) ? Math.ceil(this.pageInfo.total / 10) : event;
    // this.selectPage = this.pageInfo.page;
    // this.pageInfo.page = event;
    this.gotoPage.emit(this.pageInfo.page);
  }

  ngOnInit() {
  }
  ngOnChanges(changes: any) {
    // if (changes.pageInfo) {
    // }
  }

}
