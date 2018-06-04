import { Component, OnInit, Input } from "@angular/core";
import * as d3 from "d3v4";
import { map } from "d3";

@Component({
  selector: "app-learner-performance",
  templateUrl: "./learner-performance.component.html",
  styleUrls: ["./learner-performance.component.scss"]
})
export class LearnerPerformanceComponent implements OnInit {
  @Input() performanceData:any;
  constructor() {}

  ngOnInit() {
    console.log("performanceData",this.performanceData);
    // var data = map(this.performanceData, 
    //   (value,index)=>{ 
    //   return([value]);
    // });
    
    var w = 560;
    var h = 200;

    var arc = d3
      .arc()
      .innerRadius(90)
      .outerRadius(100);

    var svg = d3
      .select("#learnerPerformanceBig")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    //.attr("style", "margin:0 auto;");

    var g = svg
      .append("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    var data = [
      { color: "#F77F6C", type: "classA", number: 30 },
      { color: "#5584FF", type: "classB", number: 25 },
      { color: "#FFD630", type: "classD", number: 25 }
    ];

    var arcs = d3.pie().value(function(d) {
      return d.number;
    })(data);

    var arcPath = g
      .selectAll("path")
      .data(arcs)
      .enter();

    arcPath
      .append("path")
      .style("fill", function(d, i) {
        return d.data.color;
      })
      .attr("d", arc);

    arcPath
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0em")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text(function(d) {
        if (d.data.type === "classD") {
          return d.data.number;
        }
      });

    arcPath
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .text(function(d) {
        if (d.data.type === "classD") {
          return "Havent started";
        }
      });
  }
}
