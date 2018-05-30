import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import "d3-3";
import * as d3 from "d3";

@Component({
  selector: 'app-userstrained',
  templateUrl: './userstrained.component.html',
  styleUrls: ['./userstrained.component.scss']
})
export class UserstrainedComponent implements OnInit, OnChanges {
  @Input() usersData;

  chartRenderFn(chartData) {
    d3.select('#udonut-chart svg').remove();

    var backgroundArc = d3.svg.arc()
      .innerRadius(85)
      .outerRadius(100)
      .cornerRadius(10)
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180));

    var mainArc = d3.svg.arc()
      .innerRadius(85)
      .outerRadius(100)
      .cornerRadius(10)
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(function (d) {

        if (<any>d == 50) {
          return 0;
        }
        else if (<any>d > 50) {
          return (<any>d - 50) * 1.8 * Math.PI / 180;
        }
        else if (<any>d < 50) {

          return ((-90 * (Math.PI / 180)) + (<any>d) * 1.8 * Math.PI / 180);
        }

      });

    // var data = [75] // percents.

    var svg = d3.select("#udonut-chart").append("svg")
      .attr("width", 300)
      .attr("height", 130)
      .attr("style", "padding-left:30%; padding-top:5%;");

    var charts = svg.selectAll("g")
      .data(chartData)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(" + (i * 50 + 50) + ",100)";
      });
    charts.append("path")
      .attr("d", <any>backgroundArc)
      .attr("fill", "#E9E9E9")
    if (this.usersData.timeSpent < 50) {
      charts.append("path")
        .attr("d", <any>mainArc)
        .attr("fill", "#5A8BFE")

    }
    else if (this.usersData.timeSpent > 50) {
      charts.append("path")
        .attr("d", <any>mainArc)
        .attr("fill", "#5A8BFE")
    }
  }

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: any) {
    if (changes.usersData && this.usersData.timeSpent) {
      this.chartRenderFn([this.usersData.timeSpent]);
    }
  }

  ngOnInit() {
  }

}
