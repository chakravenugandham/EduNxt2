import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import "d3-3";
import  * as d3 from "d3";

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.scss']
})
export class EngagementComponent implements OnInit {
  @Input() engageData: { peopleChange: number, peopleCompletedTraining: number };

  data: any = {
    peopleChange: '',
    peopleCompletedTraining: ''
  }
  constructor(private http: HttpClient) { }
  ngOnInit() {
    //  let url = 'http://192.168.239.38:3000/api/v1/learning-activities?L_D_UserId=1&CourseId=1';
    let url = 'https://api.myjson.com/bins/p8176';
    this.http.get(url)
      .subscribe(
        (resp: any) => {
          this.data.peopleChange = resp.data.learnerEngagement.peopleChange;
          this.data.peopleCompletedTraining = resp.data.learnerEngagement.peopleCompletedTraining;
          var chartData = [];
          chartData.push(resp.data.learnerEngagement.peopleCompletedTraining);
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

          charts.append("path")
            .attr("d", <any>backgroundArc)
            .attr("fill", "#E9E9E9")

          charts.append("path")
            .attr("d", <any>mainArc)
            .attr("fill", "#5A8BFE")
        }
      )
  }
}
