import { Component, OnInit } from "@angular/core";
import * as d3 from "d3v4";
import * as _ from "underscore";

@Component({
  selector: "app-active-users",
  templateUrl: "./active-users.component.html",
  styleUrls: ["./active-users.component.scss"]
})
export class ActiveUsersComponent implements OnInit {
  public lineData;
  constructor() { }
  ngOnInit() {
<<<<<<< HEAD
    var w = 520;
    var h = 240;
    var p = 40;

    var dataSet = [
      [1518307200000, 300, 400],
      [1518393600000, 350, 550],
      [1518480000000, 400, 600],
      [1518566400000, 450, 650],
      [1518652800000, 500, 700],
      [1518739200000, 550, 750],
      [1518825600000, 600, 800]
=======
    let w = 480;
    //let w = d3.select("#activeUserGraph").width();
    let h = 200;
    let p = 90;

    let dataSet = [
      [1518307200000, 30, 40, 38, 49],
      [1518393600000, 35, 55, 42, 59],
      [1518480000000, 40, 60, 48, 69],
      [1518566400000, 45, 65, 52, 72],
      [1518652800000, 50, 70, 58, 78],
      [1518739200000, 55, 75, 62, 82],
      [1518825600000, 60, 80, 68, 89]
>>>>>>> f3b6c9b65ad8281537667517fd86482d2d3f5e2e
    ];

    // create xScale
    var xScale = d3
      .scaleTime()
      .domain(
        d3.extent(dataSet, function (d) {
          return d[0];
        })
      )
      .range([p, w - p / 2]);

    // create yScale
<<<<<<< HEAD
    var yMax = d3.max(dataSet, function(d) {
      var max = d[1] > d[2] ? d[1] : d[2];
=======
    let yMax = d3.max(dataSet, function (d) {
      let max = d[1] > d[2] ? d[1] : d[2];
>>>>>>> f3b6c9b65ad8281537667517fd86482d2d3f5e2e
      return max;
    });
    var yScale = d3
      .scaleLinear()
      .domain([0, yMax + 200])
      .range([h - p, 15]);

    // create SVG
    var svg = d3
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
          .tickFormat(function (d) {
            return d;
          })
          .tickSize(0, 0)
      );

    //d3 line generator
    var line = d3
      .line()
      .x(function (d) {
        return xScale(d[0]);
      })
      .y(function (d) {
        return yScale(d[1]);
      });

    var path = svg
      .append("path")
      .datum(dataSet)
      .attr("class", "line1")
      .attr("d", line);

    var line2 = d3
      .line()
      .x(function (d) {
        return xScale(d[0]);
      })
      .y(function (d) {
        return yScale(d[2]);
      });

    svg
      .append("path")
      .datum(dataSet) // Binds data to the line
      .attr("class", "line2") // Assign a class for styling
      .attr("d", line2); // Calls the line generator

<<<<<<< HEAD
    var dataPoints = {};
    //Creating dots
    svg
      .selectAll("circles")
      .data(dataSet)
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("cx", function(d) {
        var key = xScale(d[0]);
        dataPoints[key] = dataPoints[key] || [];
        dataPoints[key].push(d);
        return xScale(d[0]);
      })
      .attr("cy", function(d) {
        return yScale(d[1]);
      })
      .attr("fill", "white")
      .style("opacity", "0.5");

    svg
      .selectAll("circles")
      .data(dataSet)
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("cx", function(d) {
        var key = xScale(d[0]);
        dataPoints[key] = dataPoints[key] || [];
        dataPoints[key].push(d);
        return xScale(d[0]);
      })
      .attr("cy", function(d) {
        return yScale(d[2]);
      })
      .attr("fill", "white")
      .style("opacity", "0.5");

    //vertical line
    var vertline = svg
      .append("line")
      .attr("class", "vertline")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", h - p)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("opacity", "0");

    svg.on("mousemove", function() {
      let mouseX = d3.event.pageX;
      vertline.attr("opacity", "1");
      var keys = _.keys(dataPoints).sort();
      var epsilon = (keys[1] - keys[0]) / 2;
      var nearest = _.find(keys, function(a) {
        return Math.abs(a - mouseX) <= epsilon;
=======
    let line3 = d3
      .line()
      .x(function (d) {
        return xScale(d[0]);
      })
      .y(function (d) {
        return yScale(d[3]);
      });

    svg
      .append("path")
      .datum(dataSet) // Binds data to the line
      .attr("class", "line3") // Assign a class for styling
      .attr("d", line3); // Calls the line generator


    let line4 = d3
      .line()
      .x(function (d) {
        return xScale(d[0]);
      })
      .y(function (d) {
        return yScale(d[4]);
>>>>>>> f3b6c9b65ad8281537667517fd86482d2d3f5e2e
      });
      if (nearest) {
        vertline.attr("x1", nearest).attr("x2", nearest);
        d3
          .select(".ttip-date")
          .html(d3.timeFormat("%d %b")(new Date(dataPoints[nearest][0][0])));
        d3
          .select(".ttip-learners")
          .html(dataPoints[nearest][0][1] + " Active Learner");
        d3
          .select(".ttip-faculty")
          .html(dataPoints[nearest][0][2] + " Active Faculty");
        var tooltip = d3.select(".tool-tip");
        tooltip.style("visibility", "visible");
        tooltip.style("top", 150 + "px").style("left", nearest - 150 + "px");
      }
    });

<<<<<<< HEAD
    svg.on("mouseout", function() {
      vertline.attr("opacity", "0");
      var tooltip = d3.select(".tool-tip");
      tooltip.style("visibility", "hidden");
    });
=======
    svg
      .append("path")
      .datum(dataSet) // Binds data to the line
      .attr("class", "line4") // Assign a class for styling
      .attr("d", line4); // Calls the line generator
>>>>>>> f3b6c9b65ad8281537667517fd86482d2d3f5e2e
  }
}
