import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as d3 from "d3v4";

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

          var w = 260;
          var h = 130;

          var arc = d3.arc()
            .innerRadius(40)
            .outerRadius(55)

          var svg = d3.select("#piechart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

          var g = svg.append("g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")

          var data = [{ color: '#F77F6C', type: 'classA', number: 30 }, { color: '#5584FF', type: 'classB', number: 25 }, { color: '#23B14D', type: 'classC', number: 35 }, { color: '#FFD630', type: 'classD', number: 25 }];

          var arcs = d3.pie().value(function (d) { return d.number; })(data);

          var arcPath = g.selectAll("path")
            .data(arcs)
            .enter()

          arcPath.append("path")
            .style("fill", function (d, i) { return d.data.color; })
            .attr("d", arc)
        })
  }
}