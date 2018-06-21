import { Directive, ElementRef, Input, OnChanges, OnInit } from "@angular/core";

// import * as d3 from "d3v4";
declare let d3: any;

@Directive({
  selector: "[appBarChart]"
})
export class BarChartDirective implements OnChanges {
  @Input() data;
  dataset = [];

  // dataset model
  // dataset = [{ label: "course_name", Group1: 60, Group2: 72, Group3: 46 }];

  constructor(private el: ElementRef) { }

  performanceChart() {
    this.el.nativeElement.innerHTML = "";
    let chartDiv = document.createElement("div");

    function rightRoundedRect(x, y, width, height, radius) {
      return (
        "M" +
        x +
        "," +
        y +
        "h" +
        (width - radius) +
        "a" +
        radius +
        "," +
        radius +
        " 0 0 1 " +
        radius +
        "," +
        radius +
        "v" +
        (height - 2 * radius) +
        "a" +
        radius +
        "," +
        radius +
        " 0 0 1 " +
        -radius +
        "," +
        radius +
        "h" +
        (radius - width) +
        "z"
      );
    }

    let margin = 30,
      width = d3
        .select(this.el.nativeElement)
        .node()
        .getBoundingClientRect().width,
      height = 200;

    let svg = d3
      .select(this.el.nativeElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height + margin * 2)
      .append("g")
      .attr("transform", "translate(" + margin + "," + margin + ")");

    let x0 = d3.scale.ordinal().rangeRoundBands([0, width], 0.5, 0.5);

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

    this.dataset.forEach(function (d) {
      d.valores = options.map(function (name) {
        return { name: name, value: +d[name] };
      });
    });

    x0.domain(
      this.dataset.map(function (d) {
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
      .range(["#FFD630", "#F77F6C", "#5584FF", "#23b14d"]);

    bar
      .selectAll("rect")
      .data(function (d) {
        return d.valores;
      })
      .enter()
      .append("rect")
      .attr("width", x1.rangeBand() - 8)
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

  ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      this.dataset = this.data;
      console.log("this.dataset", this.dataset);

      this.performanceChart();
    }
  }
}
