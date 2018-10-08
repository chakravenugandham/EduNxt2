import { Component, OnInit } from '@angular/core';
import { ProgramcardComponent, programData } from "../../common/programcard/programcard.component";

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  programdata1: programData;
  programdata2: programData;
  programdata3: programData;
  constructor() { }

  ngOnInit() {

    this.programdata1 = {
      imgUrl: '../assets/images/program_01.PNG',
      programName: "Product Management",
      noOfUsers: 530,
      changeInUsers: 20,
      users: 'users',
      sinceLastMonth: 'since last batch'
    },
      this.programdata2 = {
        imgUrl: '../assets/images/program_02.PNG',
        programName: "Customer Service",
        noOfUsers: 537,
        changeInUsers: 20,
        users: 'users',
        sinceLastMonth: 'since last batch'
      },
      this.programdata3 = {
        imgUrl: '../assets/images/program_03.PNG',
        programName: "Communication 101",
        noOfUsers: 640,
        changeInUsers: 20,
        users: 'users',
        sinceLastMonth: 'since last batch'
      }
  }

}
