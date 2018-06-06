import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as d3 from "d3v4";

@Component({
  selector: "app-pace",
  templateUrl: "./pace.component.html",
  styleUrls: ["./pace.component.scss"]
})
export class PaceComponent implements OnInit, OnChanges {
  @Input() paceDataElement;

  constructor() {}
  chartRenderFn() {
    d3.select("#piechart svg").remove();
    // let w = 235;
    let w = d3
      .select("#piechart")
      .node()
      .getBoundingClientRect().width;
    let h = 130;

    let arc = d3
      .arc()
      .innerRadius(40)
      .outerRadius(55);

    let svg = d3
      .select("#piechart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    let g = svg
      .append("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    let data = [
      {
        color: "#F77F6C",
        type: "classA",
        number: this.paceDataElement.behindSchedule
      },
      {
        color: "#5584FF",
        type: "classB",
        number: this.paceDataElement.haventStarted
      },
      {
        color: "#23B14D",
        type: "classC",
        number: this.paceDataElement.aheadOfSchedule
      },
      { color: "#FFD630", type: "classD", number: this.paceDataElement.onTrack }
    ];

    let arcs = d3.pie().value(function(d) {
      return d.number;
    })(data);

    let arcPath = g
      .selectAll("path")
      .data(arcs)
      .enter();

    arcPath
      .append("path")
      .style("fill", function(d, i) {
        return d.data.color;
      })
      .attr("d", arc);
  }

  ngOnChanges(changes: any) {
    if (changes.paceDataElement) {
      this.chartRenderFn();
    }
  }

  ngOnInit() {}
}
