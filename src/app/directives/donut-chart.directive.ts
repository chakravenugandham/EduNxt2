import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit
} from "@angular/core";
import * as d3 from "d3v4";

@Directive({
  selector: "[appDonutChart]"
})
export class DonutChartDirective implements OnChanges {
  @Input() data: any;
  @Input() componentName: string;

  // graph data model
  // dataSet = [
  //   { color: "#F77F6C", type: "classA", number: 46 },
  //   { color: "#5584FF", type: "classB", number: 24 },
  //   { color: "#23B14D", type: "classC", number: 32 },
  //   { color: "#FFD630", type: "classE", number: 67 }
  // ];

  constructor(private el: ElementRef) {}

  chartRenderFn(chartData) {
    this.el.nativeElement.innerHTML = "";

    let w = d3
      .select(this.el.nativeElement)
      .node()
      .getBoundingClientRect().width;
    let h: number;
    if (this.componentName == "active-learner-pace") {
      h = 130;
    } else {
      h = 240;
    }

    let arc = d3
      .arc()
      // .innerRadius(90)
      // .outerRadius(100);
      .innerRadius(this.componentName == "active-learner-pace" ? 40 : 90)
      .outerRadius(this.componentName == "active-learner-pace" ? 55 : 100);

    let svg = d3
      .select(this.el.nativeElement)
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    let g = svg
      .append("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    let arcs = d3.pie().value(function(d) {
      return d.number;
    })(chartData);

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
          return "Haven't Started";
        }
      });
  }

  ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      this.chartRenderFn(this.data);
    }
  }
}
