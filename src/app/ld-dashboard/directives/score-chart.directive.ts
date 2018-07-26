import { Directive, ElementRef, Input, OnChanges, OnInit } from "@angular/core";
import * as d3 from "d3v4";
// import * as _ from "underscore";

@Directive({
  selector: "[appScoreChart]"
})
export class ScoreChartDirective implements OnInit, OnChanges {
  @Input() data: any;

  constructor(private el: ElementRef) { }

  chartRenderFn() {
    this.el.nativeElement.innerHTML = "";
    d3.select(this.el.nativeElement)
      .selectAll("svg")
      .remove();
    let width = d3
      .select(this.el.nativeElement)
      .node()
      .getBoundingClientRect().width;
    let height = 280,
      padding = 50;

    // create xScale
    let xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.data, d => {
          return d[0];
        })
      ])
      .range([padding, width - 15]);

    // create yScale
    let yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.data, d => {
          return d[1];
        })
      ])
      .range([height - padding, 15]);

    // create SVG
    let svg = d3
      .select(this.el.nativeElement)
      .attr("class", "testScoresGraph")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    function make_y_gridlines() {
      return d3.axisLeft(yScale).ticks(5);
    }

    // add the Y gridlines
    svg
      .append("g")
      .attr("class", "y-grid grid")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(
        make_y_gridlines()
          .tickSize(-(width - padding - padding / 2))
          .tickFormat("")
      );

    // create yAxis
    svg
      .append("g")
      .attr("class", "y-axis axis")
      .attr("transform", "translate(" + (padding - 5) + ", 0)")
      .call(d3.axisLeft(yScale).ticks(5));

    //area line generator
    let area = d3
      .area()
      .x(function (d) {
        return xScale(d[0]);
      })
      .y1(function (d) {
        return yScale(d[1]);
      })
      .curve(d3.curveCatmullRom.alpha(0.5));

    area.y0(yScale(0));

    svg
      .append("path")
      .datum(this.data) // Binds data to the line
      .attr("class", "area-color")
      .attr("d", area); // Calls the area generator

    svg
      .append("text")
      .text("No.of users")
      .attr("transform", "rotate(-90),translate( " + height / 8 + ",-10 )")
      .attr("x", -(height / 2))
      .attr("y", 20);

    svg
      .append("text")
      .text("Score Ranges")
      .attr(
        "transform",
        "translate(" + (width - 104) + "," + (height - 10) + ")"
      );

    function make_x_gridlines() {
      return d3.axisBottom(xScale).ticks(5);
    }

    // add the X gridlines
    svg
      .append("g")
      .attr("class", "x-grid grid")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .attr("y", padding)
      .call(
        make_x_gridlines()
          .tickSize(-(height - padding - 10))
          .tickFormat("")
      );

    svg
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", xScale(0))
      .attr("y1", 0)
      .attr("x2", xScale(100))
      .attr("y2", 0)
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#FF4E00" },
        { offset: "20%", color: "#FF4E00" },
        { offset: "20%", color: "#F77F6C" },
        { offset: "40%", color: "#F77F6C" },
        { offset: "40%", color: "#f7cf00" },
        { offset: "60%", color: "#f7cf00" },
        { offset: "60%", color: "#FFD630" },
        { offset: "80%", color: "#FFD630" },
        { offset: "80%", color: "#39EA37" },
        { offset: "90%", color: "#39EA37" },
        { offset: "90%", color: "#5584FF" },
        { offset: "0%", color: "#5584FF" }
      ])
      .enter()
      .append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      });

    // create xAxis
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .call(d3.axisBottom(xScale).ticks(5));
  }

  ngOnInit() {
    // this.chartRenderFn();
  }

  ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      // this.data = changes.data.currentValue;
      this.chartRenderFn();
    }
  }
}
