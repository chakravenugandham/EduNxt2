import { Component, OnInit } from "@angular/core";
import * as d3 from "d3v4";

@Component({
  selector: "app-active-users",
  templateUrl: "./active-users.component.html",
  styleUrls: ["./active-users.component.scss"]
})
export class ActiveUsersComponent implements OnInit {
  public lineData;
  constructor() {}
  ngOnInit() {
    let w = 480;
    //let w = d3.select("#activeUserGraph").width();
    console.log("w", w);
    let h = 200;
    let p = 90;

    let dataSet = [
      [1518307200000, 30, 40,38,49],
      [1518393600000, 35, 55,42,59],
      [1518480000000, 40, 60,48,69],
      [1518566400000, 45, 65,52,72],
      [1518652800000, 50, 70,58,78],
      [1518739200000, 55, 75,62,82],
      [1518825600000, 60, 80,68,89]
    ];

    // create xScale
    let xScale = d3
      .scaleTime()
      .domain(
        d3.extent(dataSet, function(d) {
          return d[0];
        })
      )
      .range([p, w - p / 2]);

    // create yScale
    let yMax = d3.max(dataSet, function(d) {
      let max = d[1] > d[2] ? d[1] : d[2];
      return max;
    });
    let yScale = d3
      .scaleLinear()
      .domain([0, yMax + 20])
      .range([h - p, 15]);

    // create SVG
    let svg = d3
      .select("#activeUserGraph")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    function make_y_gridlines() {
      return d3.axisLeft(yScale).ticks(5);
    }

    // add the Y gridlines
    svg
      .append("g")
      .attr("class", "grid")
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
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat(d3.timeFormat("%d-%b"))
          .tickSizeInner(20)
          .tickPadding(6)
          .tickSize(15, 0)
      );

    // create yAxis
    svg
      .append("g")
      .attr("class", "y-axis axis")
      .attr("transform", "translate(" + p + ", 0)")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickFormat(function(d) {
            return d;
          })
          .tickSize(0, 0)
      );

    //d3 line generator
    let line1 = d3
      .line()
      .x(function(d) {
        return xScale(d[0]);
      })
      .y(function(d) {
        return yScale(d[1]);
      });

    svg
      .append("path")
      .datum(dataSet) // Binds data to the line
      .attr("class", "line1") // Assign a class for styling
      .attr("d", line1); // Calls the line generator

    let line2 = d3
      .line()
      .x(function(d) {
        return xScale(d[0]);
      })
      .y(function(d) {
        return yScale(d[2]);
      });

    svg
      .append("path")
      .datum(dataSet) // Binds data to the line
      .attr("class", "line2") // Assign a class for styling
      .attr("d", line2); // Calls the line generator

      let line3 = d3
      .line()
      .x(function(d) {
        return xScale(d[0]);
      })
      .y(function(d) {
        return yScale(d[3]);
      });

    svg
      .append("path")
      .datum(dataSet) // Binds data to the line
      .attr("class", "line3") // Assign a class for styling
      .attr("d", line3); // Calls the line generator
  

  let line4 = d3
      .line()
      .x(function(d) {
        return xScale(d[0]);
      })
      .y(function(d) {
        return yScale(d[4]);
      });

    svg
      .append("path")
      .datum(dataSet) // Binds data to the line
      .attr("class", "line4") // Assign a class for styling
      .attr("d", line4); // Calls the line generator
    }
}
