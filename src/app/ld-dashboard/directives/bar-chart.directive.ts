import { Directive, ElementRef, Input, OnChanges, OnInit } from "@angular/core";

// import * as d3 from "d3v4";
declare let d3: any;

@Directive({
  selector: "[appBarChart]"
})
export class BarChartDirective implements OnInit, OnChanges {
  @Input() data;
  @Input() getTab;
  // dataset = [];

  constructor(private el: ElementRef) { }

  rightRoundedRect(x, y, width, height, radius) {
    return ("M" + x + "," + y + "h" + (width - radius) + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius + "v" + (height - 2 * radius) + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius + "h" + (radius - width) + "z"
    );
  }


  performanceChart() {
    this.el.nativeElement.innerHTML = "";

    let margin: number = 50,
      width = 500,
      h = 220,
      p = 50;

    //this.data = { label: "Data Structures", Group1: 60 };
    let calculatedWidth =
      this.data.length > 6 ? width + 20 * (this.data.length - 6) : width;

    if (this.data.length > 6) {
      d3.select(".bar-chart-graph").attr("overflow-x", "scroll");
    }


    let svg = d3
      .select(this.el.nativeElement)
      .append("svg")
      // .attr("min-width", width)
      .attr("width", calculatedWidth)
      .attr("height", h + margin * 2)
      .append("g")
      .attr("transform", "translate(" + margin + "," + (margin - 30) + ")");

    var x0 = d3.scale.ordinal()
      .rangeRoundBands([0, calculatedWidth], 0.5, 0.5);
    //.rangeRoundBands([0, width], .3);
    //.paddingInner(0.4);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
      .range([h, 0]);

    var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

    var options = d3.keys(this.data[0]).filter(function (key) { return key !== "label"; });

    this.data.forEach(function (d) {
      d.valores = options.map(function (name) {
        return {
          name: name,
          value: +d[name],
          label: d.label
        };
      });
    });

    const orgLabels = {};

    x0.domain(this.data.map(function (d) {
      const label = d.label.slice(0, 5) + "...";
      orgLabels[label] = d.label;
      d.label = label;
      return d.label;
    }));

    x1.domain(options).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0,
      d3.max(this.data, d => {
        let maxBar = Math.ceil(d.Group1)
        if (maxBar <= 8) {
          return 8;
        }
        else {
          return maxBar;
        }
      })
    ]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (h) + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)

    var bar = svg.selectAll(".bar")
      .data(this.data)
      .enter().append("g")
      .attr("class", "rect")
      .attr("transform", function (d) { return "translate(" + x0(d.label) + ",0)"; });


    var color = d3.scale.ordinal().range(['#5584FF']);


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

    bar.selectAll("rect")
      .data(function (d) {
        return d.valores;
      })
      .enter().append("rect")
      .attr("width", (x1.rangeBand() - 3))
      .attr("x", function (d) { return x1(d.name); })
      .attr("y", function (d) { return y(d.value); })
      .attr("value", function (d) { return d.name; })
      .attr("height", function (d) { return h - y(d.value); })
      //.attr("d", function (d, i) { return this.rightRoundedRect(10 + 40 * i, 100 - d, 20, d, 5) })
      .style("fill", function (d) { return color(d.name); })
      .on('mouseover', function (d) {
        //var data = d3.select(d).data();
        tooltip.transition().style('opacity', 1)
        tooltip.html(
          "<div style='color:#0146F9'>" +
          d.label + "</div>" +
          "<div style='color:#0146F9'>" +
          d.value + "</div>"
        ).style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY) + 'px')
      })
      .on('mouseout', function (d) {
        tooltip.transition()
          .style('opacity', 0)
      });


    if (this.getTab == "performance") {
      svg
        .append("text")
        .text("Performance")
        .attr("transform", "rotate(-90),translate( " + h / 4 + ",-50 )")
        .attr("x", -(h / 2))
        .attr("y", 14);
    }

    if (this.getTab == "progress") {
      svg
        .append("text")
        .text("Progress")
        .attr("transform", "rotate(-90),translate( " + h / 4 + ",-50 )")
        .attr("x", -(h / 2))
        .attr("y", 14);
    }
  }


  ngOnInit() { }

  ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      this.performanceChart();
    }
  }
}
