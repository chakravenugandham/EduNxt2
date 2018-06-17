import { Component, OnInit, Input } from '@angular/core';
import * as d3 from "d3v4";

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  //@Input() value: any;
  @Input() data: dataClass;

  chartRenderFn(chartData) {
    d3.select("#learnerPaceBig svg").remove();

    let w = d3.select("#learnerPaceBig").node().getBoundingClientRect().width;
    let h = 130;

    let arc = d3
      .arc()
      .innerRadius(90)
      .outerRadius(100);

    let svg = d3
      .select("#learnerPaceBig")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    let g = svg
      .append("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    let arcs = d3.pie().value(function (d) {
      return d.number;
    })(this.data);

    let arcPath = g
      .selectAll("path")
      .data(arcs)
      .enter();

    arcPath
      .append("path")
      .style("fill", function (d, i) {
        return d.data.color;
      })
      .attr("d", arc);

    arcPath
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0em")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text(function (d) {
        if (d.data.type === "classD") {
          return d.data.number;
        }
      });

    arcPath
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .style("font-weight", "bold")
      .text(function (d) {
        if (d.data.type === "classD") {
          return "Haven't started";
        }
      });
  }

  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.data.currentValue) {
      this.chartRenderFn(this.data);
    }

  }

  ngOnInit() {
    if (this.data.chartValue) {
      this.chartRenderFn(this.data);
    }
  }

}

export class dataClass {
  chartValue: any;
}
