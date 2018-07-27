import { Directive, ElementRef, Input, OnChanges, OnInit } from "@angular/core";

// import * as d3 from "d3v4";
declare let d3: any;

@Directive({
  selector: "[appBarChart]"
})
export class BarChartDirective implements OnInit, OnChanges {
  @Input() data;
  // dataset = [];

  // data model
  // data = [
  //   { label: "Data Structures", Group1: 60 },
  //   { label: "Algo", Group1: 30 },
  //   { label: "Database", Group1: 40 },
  //   { label: "ML", Group1: 50 },
  //   { label: "Problem Solving", Group1: 60 },
  //   { label: "DB 2", Group1: 30 },
  //   { label: "D S 2", Group1: 20 },
  //   { label: "Algorithms1", Group1: 70 },
  //   { label: "ML 2", Group1: 40 },
  //   { label: "Problem", Group1: 50 },
  //   { label: "ML 3", Group1: 30 },
  //   { label: "Database 3", Group1: 80 },
  //   { label: "Problem Solving4", Group1: 60 }
  // ];

  constructor(private el: ElementRef) {}

  performanceChart() {
    this.el.nativeElement.innerHTML = "";
    // let chartDiv = document.createElement("div");

    // function rightRoundedRect(x, y, width, height, radius) {
    //   return (
    //     "M" +
    //     x +
    //     "," +
    //     y +
    //     "h" +
    //     (width - radius) +
    //     "a" +
    //     radius +
    //     "," +
    //     radius +
    //     " 0 0 1 " +
    //     radius +
    //     "," +
    //     radius +
    //     "v" +
    //     (height - 2 * radius) +
    //     "a" +
    //     radius +
    //     "," +
    //     radius +
    //     " 0 0 1 " +
    //     -radius +
    //     "," +
    //     radius +
    //     "h" +
    //     (radius - width) +
    //     "z"
    //   );
    // }

    let margin: number = 50,
      width = 500,
      height = 250,
      p = 50;
    let calculatedWidth =
      this.data.length > 6 ? width + 46 * (this.data.length - 6) : width;

    if (this.data.length > 6) {
      d3.select(".bar-chart-graph").attr("overflow-x", "scroll");
    }

    let svg = d3
      .select(this.el.nativeElement)
      .append("svg")
      // .attr("min-width", width)
      .attr("width", calculatedWidth)
      .attr("height", height + margin * 2)
      .append("g")
      .attr("transform", "translate(" + margin + "," + margin + ")");

    let x0 = d3.scale.ordinal().rangeRoundBands([0, calculatedWidth], 0.5, 0.5);

    let x1 = d3.scale.ordinal();

    let y = d3.scale.linear().range([height, 0]);

    // ---- create xScale ----
    // var yScale = d3
    //   .scaleLinear()
    //   .domain([0, 100])
    //   .range([p, calculatedWidth - 15]);

    // function make_y_gridlines() {
    //   return d3.axisLeft(yScale).ticks(5);
    // }

    let xAxis = d3.svg
      .axis()
      .scale(x0)
      .orient("bottom");

    let yAxis = d3.svg
      .axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

    let options = d3.keys(this.data[0]).filter(function(key) {
      return key !== "label";
    });

    this.data.forEach(function(d: any) {
      d.valores = options.map(function(name) {
        return { name: name, value: +d[name] };
      });
    });

    x0.domain(
      this.data.map(function(d: any) {
        return d.label;
      })
    );

    x1.domain(options).rangeRoundBands([0, x0.rangeBand()]);

    y.domain([0, 100]);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6);

    // ---- add the Y gridlines ----
    // svg
    //   .append("g")
    //   .attr("class", "y-grid grid")
    //   .attr("transform", "translate(" + p + ", 0)")
    //   .call(
    //     make_y_gridlines()
    //       .tickSize(-(calculatedWidth - p - p / 2))
    //       .tickFormat("")
    //   );

    let bar = svg
      .selectAll(".bar")
      .data(this.data)
      .enter()
      .append("g")
      .attr("class", "rect")
      .attr("transform", function(d) {
        return "translate(" + x0(d.label) + ",0)";
      });

    let color = d3.scale
      .ordinal()
      .range(["#5584FF", "#F77F6C", "#FFD630", "#23B14D"]);

    svg
      .append("text")
      .text("No. of Users")
      .attr("transform", "rotate(-90),translate( " + height / 4 + ",-50 )")
      .attr("x", -(height / 2))
      .attr("y", 14);

    bar
      .selectAll("rect")
      .data(function(d: any) {
        return d.valores;
      })
      .enter()
      .append("rect")
      // .attr("width", x1.rangeBand() - 8)
      .attr("width", 18)
      .attr("x", function(d) {
        return x1(d.name);
      })
      .attr("y", function(d) {
        return y(d.value);
      })
      .attr("value", function(d) {
        return d.name;
      })
      .attr("height", function(d) {
        return height - y(d.value);
      })
      .style("fill", function(d) {
        return color(d.name);
      });
  }

  ngOnInit() {
    // this.performanceChart();
  }
  ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      // this.dataset = this.data;
      this.performanceChart();
    }
  }
}
