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
    if (event !== undefined) {
      event = event > this.pageInfo.total_pages ? this.pageInfo.total_pages : event;
      this.gotoPage.emit(event);
    }
  }

  ngOnInit() {
  }

}
