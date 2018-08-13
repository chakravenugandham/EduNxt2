import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit, OnChanges {
  @Input() pageInfo: any;
  @Output() gotoPage = new EventEmitter<any>();
  constructor() { }

  loadPage(event) {
    this.pageInfo.page = event;
    this.gotoPage.emit(this.pageInfo.page);
  }

  ngOnInit() {
  }
  ngOnChanges(changes: any) {
    // if (changes.pageInfo) {
    // }
  }

}
