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

  // data model
  // data = [
  //   { label: "Data Structures", "Data Structures": 60 },
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
    y.domain([0, 100]);

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
      .style("fill", function (d) { return color(d.name); })
      .on('mouseover', function (d) {
        //var data = d3.select(d).data();
        tooltip.transition().style('opacity', 1)
        tooltip.html(d.label).style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY) + 'px')
      })
      .on('mouseout', function (d) {
        tooltip.transition()
          .style('opacity', 0)
      })

  }


  ngOnInit() {
    // this.performanceChart();
  }
  ngOnChanges(changes: any) {
    //console.log(this.dataSet);

    if (changes.data && changes.data.currentValue) {
      console.log(this.getTab);
      // this.dataset = this.data;
      this.performanceChart();
    }
  }
}
