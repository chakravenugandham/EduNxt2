import { Directive, ElementRef, Input, OnChanges, HostListener } from "@angular/core";
import * as d3 from "d3v4";

@Directive({
  selector: "[appScoreChart]"
})
export class ScoreChartDirective implements OnChanges {
  @Input() data: any;

  constructor(private el: ElementRef) { }

  //chartfunction
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
      padding = 65;

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
      .style("stroke-opacity", "0.7")
      .style("shape-rendering", "crispEdges")
      .style("stroke-dasharray", "5, 5")
      .call(
        make_y_gridlines()
          .tickSize(-(width - padding - padding / 2))
          .tickFormat("")
      );

    // create yAxis
    svg
      .append("g")
      .attr("class", "y-axis axis")
      .attr("transform", "translate(" + (padding - 15) + ", 0)")
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
      .curve(d3.curveCatmullRom.alpha(1.5));

    area.y0(yScale(0));

    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    let tooltip = d3.select("body").append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('padding', '5px')
      .style('border', '1px #5584ff solid')
      .style('border-radius', '2px')
      .style('opacity', '0')
      .style('font-size', '12px')

    let arrayValue;

    svg
      .append("path")
      .datum(this.data) // Binds data to the line
      .attr("class", "area-color")
      .attr("d", area) // Calls the area generator
      .style("fill", "#f77f6c")

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
        "translate(" + (width - 104) + "," + (height - 10) + ")");

    function make_x_gridlines() {
      return d3.axisBottom(xScale).ticks(5);
    }

    // add the X gridlines
    svg
      .append("g")
      .attr("class", "x-grid grid")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .style("stroke-opacity", "0.7")
      .style("shape-rendering", "crispEdges")
      .style("stroke-dasharray", "5, 5")
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
        { offset: "60%", color: "#39EA37" },
        { offset: "80%", color: "#39EA37" },
        { offset: "80%", color: "#5584FF" },
        { offset: "100%", color: "#5584FF" }
        // { offset: "100%", color: "#FFD630" },
        // { offset: "0%", color: "#FFD630" }
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
      .call(d3.axisBottom(xScale).ticks(5))

  }

  ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      this.chartRenderFn();
    }
  }

  @HostListener('window:resize') onresize() {
    this.chartRenderFn();
  }
}
