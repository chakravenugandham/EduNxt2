import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {
  @Input() pageInfo: any;
  @Output() gotoPage = new EventEmitter<any>();
  selectPage: number;

  digitsOnly = /[1234567890]/g;

  constructor() { }

  loadPage(event) {
    if (event !== undefined) {
      event = event > this.pageInfo.total_pages ? this.pageInfo.total_pages : event;
      this.gotoPage.emit(event);
    }
  }

  blockSpecialChar(e) {
    if (e.keyCode === 189 || e.keyCode === 187) {
      this.selectPage = undefined;
    }
  }

  ngOnInit() { }

}
