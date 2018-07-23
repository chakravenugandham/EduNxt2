import { Directive, ElementRef, Input, OnChanges, OnInit } from "@angular/core";

// import * as d3 from "d3v4";
declare let d3: any;

@Directive({
  selector: "[appBarChart]"
})
export class BarChartDirective implements OnInit, OnChanges {
  @Input() data;
  dataset = [];

  // dataset model
  // dataset = [
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

  constructor(private el: ElementRef) { }

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

    let margin: number = 30,
      width = 500,
      height = 200;
    let calculatedWidth =
      this.dataset.length > 6 ? width + 46 * (this.dataset.length - 6) : width;

    if (this.dataset.length > 6) {
      d3.select(".bar-chart-graph").attr("overflow-x", "scroll");
    }

    // console.log("width", width);
    // console.log("this.dataset.length", this.dataset.length);
    // console.log("this.dataset.length / 6", this.dataset.length - 6);
    // console.log("calculatedWidth", calculatedWidth);

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

    let xAxis = d3.svg
      .axis()
      .scale(x0)
      .orient("bottom");

    let yAxis = d3.svg
      .axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

    let options = d3.keys(this.dataset[0]).filter(function (key) {
      return key !== "label";
    });

    this.dataset.forEach(function (d: any) {
      // console.log("d", d);

      d.valores = options.map(function (name) {
        return { name: name, value: +d[name] };
      });
    });

    x0.domain(
      this.dataset.map(function (d: any) {
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

    let bar = svg
      .selectAll(".bar")
      .data(this.dataset)
      .enter()
      .append("g")
      .attr("class", "rect")
      .attr("transform", function (d) {
        return "translate(" + x0(d.label) + ",0)";
      });

    let color = d3.scale
      .ordinal()
      .range(["#F77F6C", "#FFD630", "#5584FF", "#23b14d"]);

    svg
      .append("text")
      .text("Performance")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", 20);

    bar
      .selectAll("rect")
      .data(function (d: any) {
        return d.valores;
      })
      .enter()
      .append("rect")
      // .attr("width", x1.rangeBand() - 8)
      .attr("width", 24)
      .attr("x", function (d) {
        return x1(d.name);
      })
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("value", function (d) {
        return d.name;
      })
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .style("fill", function (d) {
        return color(d.name);
      });
  }

  ngOnInit() {
    // this.performanceChart();
  }
  ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      this.dataset = this.data;
      this.performanceChart();
    }
  }
}
