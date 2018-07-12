import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outliers',
  templateUrl: './outliers.component.html',
  styleUrls: ['./outliers.component.scss']
})
export class OutliersComponent implements OnInit {

  outliersValues = [];
  componentName = "faculty-outliers";

  constructor() { }

  ngOnInit() {
    this.outliersValues = [
      {
        color: "#F77F6C",
        type: "classA",
        number: 24
      },
      {
        color: "#5584FF",
        type: "classB",
        number: 30
      }
    ];
  }

}
