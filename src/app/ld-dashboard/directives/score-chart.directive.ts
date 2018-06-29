import { Directive, ElementRef, Input, OnChanges } from "@angular/core";
import * as d3 from "d3v4";

@Directive({
  selector: "[appScoreChart]"
})
export class ScoreChartDirective implements OnChanges {
  @Input() data: any;

  constructor(private el: ElementRef) { }

  chartRenderFn(chartData) {
    this.el.nativeElement.innerHTML = "";
    let w = d3
      .select(this.el.nativeElement)
      .node()
      .getBoundingClientRect().width;
    var h = 280;
    var p = 50;

    // create xScale
    var xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(chartData, function (d) {
          return d[0];
        })
      ])
      .range([p, w - 15]);

    // create yScale
    var yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(chartData, function (d) {
          return d[1];
        })
      ])
      .range([h - p, 15]);

    // create SVG
    var svg = d3
      .select(this.el.nativeElement)
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
      .attr("transform", "translate(" + p + ", 0)");
    // .call(make_y_gridlines()
    //   .tickSize(-(w - p - (p / 2)))
    //   .tickFormat("")
    // )

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
    var area = d3
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
      .datum(chartData) // Binds data to the line
      .attr("class", "area-color")
      .attr("d", area); // Calls the area generator

    function make_x_gridlines() {
      return d3.axisBottom(xScale).ticks(5);
    }
    // add the X gridlines
    svg
      .append("g")
      .attr("class", "x-grid grid")
      .attr("transform", "translate(0," + (h - p) + ")")
      .attr("y", p);
    // .call(make_x_gridlines()
    //   .tickSize(-(h - p - 10))
    //   .tickFormat("")
    // );

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
  }

  ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      this.chartRenderFn(this.data);
    }
  }
}
