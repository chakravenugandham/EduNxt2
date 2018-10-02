import { Component, ViewEncapsulation, OnInit, Input, OnChanges } from '@angular/core';
// import { d3 } from "d3v4";
// import * as d3 from "d3";
declare let d3: any;
// import * as d3 from 'd3v4';

@Component({
  selector: 'graph-chart',
  templateUrl: './graph-chart.component.html',
  styleUrls: ['./graph-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphChartComponent implements OnInit {

  @Input() dataset: any[];
  @Input() graphName: string;

  newdataset = [
    { label: "Module1", "Group1": 20, "Group2": 10 },
    { label: "Module2", "Group1": 30, "Group2": 20 },
    { label: "Module3", "Group1": 20, "Group2": 10 },
    { label: "Module4", "Group1": 40, "Group2": 70 },
    { label: "Module5", "Group1": 50, "Group2": 50 },
    { label: "Module6", "Group1": 60, "Group2": 40 }
  ];

  // dataset = [
  // { Group1: 0, Group2: 10, label: "Software Engineering" },
  // { label: "HTML CSS & JavaScript, Jquery Test", Group1: 0.25, Group2: 10.25 },
  // { label: "SWE concepts - Test", Group1: 0, Group2: 10 },
  // { label: "OOP  UML Test", Group1: 9.77, Group2: 19.77 },
  // { label: "Cloud_Demo 2", Group1: 0, Group2: 10 },
  // { label: "C Programming_Demo2", Group1: 2.5, Group2: 12.5 },
  // { label: "Advanced C_Demo", Group1: 6.69, Group2: 16.69 },
  //   { label: "Solution Architect Readiness Program - Demo", Group1: 8.89, Group2: 18.89 },
  //   { label: "Solution Architect Readiness Program - SARP.", Group1: 22.37, Group2: 32.370000000000005 }
  // ]
  constructor() { }

  constructGraph() {

    d3.select("#barNewChart svg").remove();

    function rightRoundedRect(x, y, width, height, radius) {
      return "M" + x + "," + y
        + "h" + (width - radius)
        + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
        + "v" + (height - 2 * radius)
        + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
        + "h" + (radius - width)
        + "z";
    }

    let margin = 50, height = 220, p = 50,
      width = this.dataset.length > 5 ? 500 + 104 * (this.dataset.length - 6) : 500;
    let svg = d3.select("#barNewChart").append("svg")
      .attr("width", width + (margin * 2))
      .attr("height", height + (100 * 1))
      .append("g")
      .attr("transform", "translate(" + margin + "," + (margin - 20) + ")");
    let x0 = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.5, 0.5);
    //.rangeRoundBands([0, width], .3);
    //.paddingInner(0.4);
    let x1 = d3.scale.ordinal();
    let y = d3.scale.linear()
      .range([height, 0]);
    let xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom")
    // .tickFormat(function (d) { return d.slice(0, 6) });
    let yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));
    let options = d3.keys(this.dataset[0]).filter(function (key) { return key !== "label"; });
    this.dataset.forEach(function (d: any) {
      d.valores = options.map(function (name) { return { name: name, value: +d[name] }; });
    });
    x0.domain(this.dataset.map(function (d) { return d.label; }));
    x1.domain(options).rangeRoundBands([0, x0.rangeBand()]);

    let max_group1 = d3.max(this.dataset, function (d) { return +d.Group1; });
    let max_group2 = d3.max(this.dataset, function (d) { return +d.Group2; });
    let total_max = Math.max(max_group1, max_group2);

    y.domain([0, total_max]);

    // y.domain([0,
    //   d3.max(this.dataset, d => {
    //     const maxBar = Math.ceil(d.Group2);
    //     if (maxBar <= 8) {
    //       return 8;
    //     } else {
    //       return maxBar;
    //     }
    //   })
    // ]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xAxis)
      .selectAll(".tick text")
      .call(wrap, x0.rangeBand());

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6);

    let bar = svg.selectAll(".bar")
      .data(this.dataset)
      .enter().append("g")
      .attr("class", "rect")
      .attr("transform", function (d) { return "translate(" + x0(d.label) + ",0)"; });

    let color = d3.scale.ordinal().range(['#5584ff', '#ffd630']);

    bar.selectAll("rect")
      .data(function (d) { return d.valores; })
      .enter().append("rect")
      .attr("width", (x1.rangeBand() - 3))
      .attr("x", function (d) { return x1(d.name); })
      .attr("y", function (d) { return y(d.value); })
      .attr("value", function (d) { return d.name; })
      .attr("height", function (d) { return height - y(d.value); })
      .style("fill", function (d) { return color(d.name); });


    let yLabelName = this.graphName.charAt(0).toUpperCase() + this.graphName.slice(1);
    svg
      .append('text')
      .text(yLabelName)
      .attr('transform', 'rotate(-90),translate( ' + height / 4 + ',-50 )')
      .attr('x', -(height / 2))
      .attr('y', 14);

    function wrap(text, width) {
      text.each(function () {
        let text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word)
            ;
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word)
              ;
          }
        }
      });
    }
  }

  ngOnInit() {
    this.constructGraph();
  }

  ngOnChanges(changes: any) {
    if (changes.dataset && changes.dataset.currentValue) {
      this.constructGraph();
    }
  }

}
