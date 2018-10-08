import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-programcard',
  templateUrl: './programcard.component.html',
  styleUrls: ['./programcard.component.scss']
})
export class ProgramcardComponent implements OnInit {

  @Input() programdata: programData;

  constructor() { }

  // ngOnChanges(changes: any) {
  //   if (changes.programdata && changes.programdata.currentValue) {
  //     this.programdata = changes.programdata.currentValue;
  //   }
  // }

  ngOnInit() {
  }

}

export class programData {
  imgUrl: string;
  programName: string;
  noOfUsers: number;
  changeInUsers: number;
  users: string;
  sinceLastMonth: string;
}
