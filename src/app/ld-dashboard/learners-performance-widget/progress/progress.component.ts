import { Component, OnInit } from "@angular/core";
// import * as d3 from "d3";
declare let d3: any;

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  dataset = [];
  performanceChart() {
    this.dataset = [
      { label: "Module1", Group1: 20, Group2: 10 },
      { label: "Module2", Group1: 30, Group2: 20 },
      { label: "Module3", Group1: 20, Group2: 10 },
      { label: "Module4", Group1: 40, Group2: 70 },
      { label: "Module5", Group1: 50, Group2: 50 },
      { label: "Module6", Group1: 60, Group2: 40 }
    ];

    function rightRoundedRect(x, y, width, height, radius) {
      return "M" + x + "," + y
           + "h" + (width - radius)
           + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
           + "v" + (height - 2 * radius)
           + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
           + "h" + (radius - width)
           + "z";
    }    

    let margin = 30, width = document.getElementById("progressGraph").offsetWidth, height = 300;

    let svg = d3
      .select("#progressGraph svg")
      // .append("svg")
      .attr("width", width)
      .attr("height", height + margin * 2)
      .append("g")
      .attr("transform", "translate(" + margin + "," + margin + ")");

    let x0 = d3.scale.ordinal().rangeRoundBands([0, width], 0.5, 0.5);
    //.rangeRoundBands([0, width], .3);
    //.paddingInner(0.4);

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

    let options = d3.keys(this.dataset[0]).filter(function(key) {
      return key !== "label";
    });

    this.dataset.forEach(function(d) {
      d.valores = options.map(function(name) {
        return { name: name, value: +d[name] };
      });
    });

    x0.domain(
      this.dataset.map(function(d) {
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
      .attr("transform", function(d) {
        return "translate(" + x0(d.label) + ",0)";
      });

    let color = d3.scale.ordinal().range(["#ffeb3ba6", "#f77f6c9c"]);

    bar
      .selectAll("rect")
      .data(function(d) {
        return d.valores;
      })
      .enter()
      .append("rect")
      .attr("width", x1.rangeBand() - 10)
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
  constructor() { }

  ngOnInit() {
    this.performanceChart();
  }

}
