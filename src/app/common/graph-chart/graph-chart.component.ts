import { Component, OnInit } from '@angular/core';
// import { d3 } from "d3v4";
// import * as d3 from "d3";
// declare let d3: any;
import * as d3 from 'd3v4';

@Component({
  selector: 'graph-chart',
  templateUrl: './graph-chart.component.html',
  styleUrls: ['./graph-chart.component.scss']
})
export class GraphChartComponent implements OnInit {

  constructor() { }

  constructGraph() {
    let w = 800;
    let h = 500;
    let p = 50;
    let dataSet = [[0, 50], [50, 30], [100, 80], [200, 40], [250, 85], [300, 60], [400, 30], [480, 60], [500, 90], [550, 10]];
    // let dataSet = [["Cryptography", 50], ["Cryptography Two", 30], ["Cryptography Three", 80]];
    let xScale = d3.scaleLinear()
      .domain([0, d3.max(dataSet, function (d) { return d[0]; })])
      .range([p, w - p]);
    let yScale = d3.scaleLinear()
      .domain([0, d3.max(dataSet, function (d) { return d[1]; })])
      .range([h - p, p]);
    let svg = d3.select("#barNewChart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    svg.selectAll(".bar")
      .data(dataSet)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        console.log(d);
        return xScale(d[0]);
      })
      .attr("y", function (d) { return yScale(d[1]); })
      .attr("width", 20)
      .attr("height", function (d) { return ((h - p) - yScale(d[1])); })
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(10," + (h - p) + ")")
      .call(d3.axisBottom(xScale));
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + p + ", 0)")
      .call(d3.axisLeft(yScale));
    svg.append("text")
      .text("Time")
      .attr("transform", "translate(" + (w / 2) + "," + h + ")")
    svg.append("text")
      .text("Pulse")
      .attr("transform", "rotate(-90)")
      .attr("x", - (h / 2))
      .attr("y", 20)
  }

  ngOnInit() {
    this.constructGraph();
  }

}
