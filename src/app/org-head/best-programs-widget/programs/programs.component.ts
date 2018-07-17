import { Component, OnInit } from '@angular/core';
import { ProgramcardComponent, programData } from "../../common/programcard/programcard.component";

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  programdata: programData;

  programData = [
    {
      programName: "Product Management",
      imgUrl: '/assets/images/program_01.PNG',
      totalCount: 543,
      userCount: 20
    },
    {
      programName: "Customer Service",
      imgUrl: '/assets/images/program_02.PNG',
      totalCount: 537,
      userCount: 24
    },
    {
      programName: "Product Management",
      imgUrl: '/assets/images/program_03.PNG',
      totalCount: 516,
      userCount: 20
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
