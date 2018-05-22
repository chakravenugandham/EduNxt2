import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pace',
  templateUrl: './pace.component.html',
  styleUrls: ['./pace.component.scss']
})
export class PaceComponent implements OnInit {
  @Input() paceDataElement: { behindSchedule: number, haventStarted: number };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let url = 'https://api.myjson.com/bins/p8176';
    this.http.get(url)
      .subscribe(
        (resp: any) => {
          console.log(resp);
          var chartData = [{
            "label": "BehindSchedule",
            "value": resp.data.learnerPace.behindSchedule
          },
          {
            "label": "HaventStarted",
            "value": resp.data.learnerPace.haventStarted
          },
          {
            "label": "BehindSchedule",
            "value": resp.data.learnerPace.behindSchedule
          },
          {
            "label": "HaventStarted",
            "value": resp.data.learnerPace.haventStarted
          }];
          //Donut chart example
          nv.addGraph(function () {
            var chart = nv.models.pieChart()
              .x(function (d) { return d.label })
              .y(function (d) { return d.value })
              .color(['#39EA37', '#F77F6C', '#5584FF', '#FFD630'])
              .height(200)
              .showLabels(false)
              .labelsOutside(false)
              .growOnHover(false)
              .donut(true)
              .padAngle(0)
              .cornerRadius(0)
              .donutRatio(0.75)
              .startAngle(function (d) { return d.startAngle - Math.PI / 2; })
              .endAngle(function (d) { return d.endAngle - Math.PI / 2; }).showLegend(false);
            ;
            chart.tooltip.enabled(false);


            d3.select("#piechart svg")
              .attr("width", 180)
              .attr("height", 160)
              .attr("style", "padding-left:0; padding-top:0;margin-top:-20px;")
              .datum(chartData)
              .call(chart);

            var svgc = d3.select("#piechart svg");

            return chart;
          });
        })
  }
}