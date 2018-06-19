import { Directive, ElementRef, Input, OnChanges, OnInit } from "@angular/core";
import * as d3 from "d3";
@Directive({
  selector: "[appHalfdonutchart]"
})
export class HalfdonutchartDirective implements OnInit, OnChanges {
  @Input() data: any;

  constructor(private el: ElementRef) {}

  chartRenderFn(chartData) {
    this.el.nativeElement.innerHTML = "";
    let chartDiv = document.createElement("div");
    var backgroundArc = d3.svg
      .arc()
      .innerRadius(85)
      .outerRadius(100)
      .cornerRadius(10)
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180));

    var mainArc = d3.svg
      .arc()
      .innerRadius(85)
      .outerRadius(100)
      .cornerRadius(10)
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(function(d) {
        if (<any>d == 50) {
          return 0;
        } else if (<any>d > 50) {
          return ((<any>d - 50) * 1.8 * Math.PI) / 180;
        } else if (<any>d < 50) {
          return -90 * (Math.PI / 180) + (<any>d * 1.8 * Math.PI) / 180;
        }
      });
    var svg = d3
      .select(chartDiv)
      .append("svg")
      .attr("width", 300)
      .attr("height", 130)
      .attr("style", "padding-left:30%; padding-top:5%;");

    var charts = svg
      .selectAll("g")
      .data(chartData)
      .enter()
      .append("g")
      .attr("transform", function(d, i) {
        return "translate(" + (i * 50 + 50) + ",100)";
      });

    charts
      .append("path")
      .attr("d", <any>backgroundArc)
      .attr("fill", "#E9E9E9");

    charts
      .append("path")
      .attr("d", <any>mainArc)
      .attr("fill", "#5A8BFE");

    this.el.nativeElement.append(chartDiv);
  }

  ngOnInit() {
    this.el.nativeElement.innerHTML = "";
  }

  ngOnChanges(changes: any) {
    if (changes.data.currentValue && changes.data) {
      this.chartRenderFn([this.data]);
    }
  }
}
