import { Component, OnInit, Input } from "@angular/core";
import * as d3 from "d3v4";

@Component({
  selector: "app-learner-pace",
  templateUrl: "./learner-pace.component.html",
  styleUrls: ["./learner-pace.component.scss"]
})
export class LearnerPaceComponent implements OnInit {
  @Input() paceData: any;

  chartRenderFn() {
    console.log("paceData", this.paceData);
    
    d3.select("#learnerPaceBig svg").remove();

    // let w = 560;
    let w = d3.select("#learnerPaceBig").node().getBoundingClientRect().width;
    let h = 200;

    let arc = d3
      .arc()
      .innerRadius(90)
      .outerRadius(100);

    let svg = d3
      .select("#learnerPaceBig")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    let g = svg
      .append("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    let data = [
      {
        color: "#F77F6C",
        type: "classA",
        number: this.paceData.aheadOfSchedule
      },
      {
        color: "#5584FF",
        type: "classB",
        number: this.paceData.behindSchedule
      },
      {
        color: "#23B14D",
        type: "classC",
        number: this.paceData.haveNotStarted
      },
      { color: "#FFD630", type: "classD", number: this.paceData.onTrack }
    ];

    let arcs = d3.pie().value(function(d) {
      return d.number;
    })(data);

    let arcPath = g
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
      .style("font-weight", "bold")
      .text(function(d) {
        if (d.data.type === "classD") {
          return "Haven't started";
        }
      });
  }

  constructor() {}

  ngOnChanges(changes: any) {
    if (changes.paceData) {
      this.chartRenderFn();
    }
  }

  ngOnInit() {}
}
