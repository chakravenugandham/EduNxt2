import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import "d3-3";
import * as d3 from "d3";

@Component({
  selector: 'app-timespent',
  templateUrl: './timespent.component.html',
  styleUrls: ['./timespent.component.scss']
})
export class TimespentComponent implements OnInit {

  @Input() timeData: { timeSpent: number, expected: number, hoursSpent: number, totalHours: number };

  data: any = {
    timeSpent: Number, expected: Number, hoursSpent: Number, totalHours: Number
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let url = 'http://192.168.239.38:3000/api/v1/learning-activities';
    //let url = 'https://api.myjson.com/bins/p8176';
    this.http.get(url)
      .subscribe(
        (resp: any) => {
          console.log(resp.data);
          this.data.timeSpent = resp.data.usersTrained.timeSpent;
          this.data.expected = resp.data.usersTrained.expected;
          this.data.hoursSpent = resp.data.usersTrained.hoursSpent;
          this.data.totalHours = resp.data.usersTrained.totalHours;
          var chartData = [];

          chartData.push(resp.data.usersTrained.timeSpent);
          //Donut chart example

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

          var svg = d3.select("#donut-chart").append("svg")
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

          if (this.data.timeSpent > 50) {
            charts.append("path")
              .attr("d", <any>mainArc)
              .attr("fill", "#5A8BFE")

          }
          else if (this.data.timeSpent < 50) {
            charts.append("path")
              .attr("d", <any>mainArc)
              .attr("fill", "#5A8BFE")
          }

          else {
            charts.append("path")
              .attr("d", <any>backgroundArc)
              .attr("fill", "#E9E9E9")
          }

        }
      )
  }
}
