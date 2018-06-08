import { Component, OnInit } from "@angular/core";
import * as d3 from "d3v4";

@Component({
  selector: "app-test-scores",
  templateUrl: "./test-scores.component.html",
  styleUrls: ["./test-scores.component.scss"]
})
export class TestScoresComponent implements OnInit {
  drawChart() {
    // let w = 600;
    let w = d3.select("#testScoresGraph").node().getBoundingClientRect().width;
    let h = 250;
    let p = 50;

    let dataSet = [
      [0, 0],
      [20, 100],
      [40, 600],
      [60, 1000],
      [80, 600],
      [100, 100],
      [110, 0]
    ];

    // create xScale
    let xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataSet, function(d) {
          return d[0];
        })
      ])
      .range([p, w - 15]);

    // create yScale
    let yScale = d3
      .scaleLinear()
      .domain([0, 1000])
      .range([h - p, 15]);

    // create SVG
    let svg = d3
      .select("#testScoresGraph")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    function make_y_gridlines() {
      return d3.axisLeft(yScale).ticks(5);
    }

    // add the Y gridlines
    svg
      .append("g")
      .attr("class", "y-grid grid")
      .attr("transform", "translate(" + p + ", 0)")
      .call(
        make_y_gridlines()
          .tickSize(-(w - p - p / 2))
          .tickFormat("")
      );

    // create xAxis
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (h - p) + ")")
      .call(d3.axisBottom(xScale).ticks(5));

    // create yAxis
    svg
      .append("g")
      .attr("class", "y-axis axis")
      .attr("transform", "translate(" + (p - 5) + ", 0)")
      .call(d3.axisLeft(yScale).ticks(5));

    //area line generator
    let area = d3
      .area()
      .x(function(d) {
        return xScale(d[0]);
      })
      .y1(function(d) {
        return yScale(d[1]);
      })
      .curve(d3.curveCatmullRom.alpha(0.5));

    area.y0(yScale(0));

    svg
      .append("path")
      .datum(dataSet) // Binds data to the line
      .attr("fill", "antiquewhite")
      .attr("d", area); // Calls the area generator

    function make_x_gridlines() {
      return d3.axisBottom(xScale).ticks(5);
    }
    // add the X gridlines
    svg
      .append("g")
      .attr("class", "x-grid grid")
      .attr("transform", "translate(0," + (h - p) + ")")
      .attr("y", p)
      .call(
        make_x_gridlines()
          .tickSize(-(h - p - 10))
          .tickFormat("")
      );
  }
  constructor() {}

  ngOnInit() {
    this.drawChart();
  }
}
