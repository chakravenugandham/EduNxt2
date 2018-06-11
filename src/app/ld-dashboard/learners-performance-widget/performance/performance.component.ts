import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
// import * as d3 from "d3";
declare let d3: any;

@Component({
  selector: "app-performance",
  templateUrl: "./performance.component.html",
  styleUrls: ["./performance.component.scss"]
})
export class PerformanceComponent implements OnInit, OnChanges {
  @Input() performanceData;
  graphInfo: any;
  // constructData(){
  //   this.graphInfo = {
  //     "moduleName": "performance",
  //     "data": this.performanceData
  //   }
  // }
  dataset = [];
  performanceChart() {
    d3.select("#performanceGraph svg").remove();

    for (let i in this.performanceData) {
      console.log(i);

      this.dataset.push({
        label: this.performanceData[i].courseName,
        Group1: this.performanceData[i].performance.old,
        Group3: this.performanceData[i].performance.new
      });
    }
    // this.dataset = [
    //   { label: "Module1", Group1: 20, Group3: 50 },
    //   { label: "Module2", Group1: 30, Group3: 70 },
    //   { label: "Module3", Group1: 20, Group3: 50 },
    //   { label: "Module4", Group1: 40, Group3: 90 },
    //   { label: "Module5", Group1: 50, Group3: 60 },
    //   { label: "Module6", Group1: 60, Group3: 30 }
    // ];

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
      width = document.getElementById("performanceGraph").offsetWidth,
      height = 200;

    let svg = d3
      .select("#performanceGraph")
      .append("svg")
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

    let color = d3.scale.ordinal().range(["#ffc107", "#ff980061"]);

    bar
      .selectAll("rect")
      .data(function(d) {
        return d.valores;
      })
      .enter()
      .append("rect")
      .attr("width", x1.rangeBand() - 12)
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
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.performanceData) {
      this.performanceChart();
    }
  }
  ngOnInit() {
    this.performanceChart();
    // this.constructData();
  }
}
