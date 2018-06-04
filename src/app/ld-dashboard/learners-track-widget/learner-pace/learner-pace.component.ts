import { Component, OnInit, Input } from "@angular/core";
import * as d3 from "d3v4";

@Component({
  selector: "app-learner-pace",
  templateUrl: "./learner-pace.component.html",
  styleUrls: ["./learner-pace.component.scss"]
})
export class LearnerPaceComponent implements OnInit {
  
  @Input() paceData:any;

  constructor() {}

  ngOnInit() {
    var w = 560;
    var h = 200;

    var arc = d3
      .arc()
      .innerRadius(90)
      .outerRadius(100);

    var svg = d3
      .select("#learnerPaceBig")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    var data = [
      { color: "#F77F6C", type: "classA", number: 30 },
      { color: "#5584FF", type: "classB", number: 25 },
      { color: "#23B14D", type: "classC", number: 35 },
      { color: "#FFD630", type: "classD", number: 25 }
    ];

    var arcs = d3.pie().value(function (d) {
      return d.number;
    })(data);

    var arcPath = g
      .selectAll("path")
      .data(arcs)
      .enter();

    arcPath
      .append("path")
      .style("fill", function (d, i) {
        return d.data.color;
      })
      .attr("d", arc);

    arcPath
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0em")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text(function (d) {
        if (d.data.type === "classD") {
          return d.data.number;
        }
      });

    arcPath
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .text(function (d) {
        if (d.data.type === "classD") {
          return "Havent started";
        }
      });
  }
}
