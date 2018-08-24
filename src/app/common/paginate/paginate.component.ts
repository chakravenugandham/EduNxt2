import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {
  @Input() pageInfo: any;
  @Output() gotoPage = new EventEmitter<any>();
  constructor() { }

  loadPage(event) {
    this.pageInfo.page = event > Math.ceil(this.pageInfo.total / 10) ? Math.ceil(this.pageInfo.total / 10) : event;
    this.gotoPage.emit(this.pageInfo.page);
  }

  ngOnInit() {
  }

}
