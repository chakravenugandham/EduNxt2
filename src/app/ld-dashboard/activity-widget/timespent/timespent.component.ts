import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as d3 from "d3";

@Component({
  selector: 'app-timespent',
  templateUrl: './timespent.component.html',
  styleUrls: ['./timespent.component.scss']
})
export class TimespentComponent implements OnInit, OnChanges {

  @Input() timeData;

  chartRenderFn(chartData) {
    console.log("timespent", this.timeData)
    d3.select('#tdonut-chart svg').remove();
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

    var svg = d3.select("#tdonut-chart").append("svg")
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

    if (this.timeData.timeSpent > 50) {
      charts.append("path")
        .attr("d", <any>mainArc)
        .attr("fill", "#5A8BFE")

    }
    else if (this.timeData.timeSpent < 50) {
      charts.append("path")
        .attr("d", <any>mainArc)
        .attr("fill", "#5A8BFE")
    }
  }

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: any) {
    if (changes.timeData && this.timeData.timeSpent) {
      console.log("timespent", this.timeData);
      this.chartRenderFn([this.timeData.timeSpent]);
    }
  }

  ngOnInit() { }
}
