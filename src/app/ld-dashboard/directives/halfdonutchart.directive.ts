import { Directive, ElementRef, Input, OnChanges, HostListener } from "@angular/core";
import * as d3 from "d3v4";

@Directive({
  selector: "[appHalfdonutchart]"
})
export class HalfdonutchartDirective implements OnChanges {
  @Input() data: any;

  constructor(private el: ElementRef) { }

  chartRenderFn(chartData) {
    this.el.nativeElement.innerHTML = "";

    let w = d3
      .select(this.el.nativeElement)
      .node()
      .getBoundingClientRect().width;

    let h: number;

    let backgroundArc = d3
      .arc()
      .innerRadius(82)
      .outerRadius(100)
      .cornerRadius(10)
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180));

    let mainArc = d3
      .arc()
      .innerRadius(82)
      .outerRadius(100)
      .cornerRadius(10)
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(function (d) {
        if (<any>d == 50) {
          return 0;
        } else if (<any>d > 50) {
          return ((<any>d - 50) * 1.8 * Math.PI) / 180;
        } else if (<any>d < 50) {
          return -90 * (Math.PI / 180) + (<any>d * 1.8 * Math.PI) / 180;
        }
      });



    let donutWidth = 280;
    let donutHeight = 170;
    let svg = d3
      .select(this.el.nativeElement)
      .append("svg")
      .attr("width", donutWidth)
      .attr("height", donutHeight)
      .attr("style", "padding-left:0%; padding-top:5%;");

    let charts = svg
      .selectAll("g")
      .data(chartData)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(130,100)";
      });

    charts
      .append("path")
      .attr("d", <any>backgroundArc)
      .attr("fill", "#E9E9E9");

    let graph_color = chartData > 50 ? "#5584FF" : "#F77F6C";

    charts
      .append("path")
      .attr("d", <any>mainArc)
      .attr("fill", graph_color);
  }

  ngOnChanges(changes: any) {
    if (changes.data.currentValue != changes.data.previousValue) {
      this.data = this.data == Infinity ? 0 : this.data;
      this.data = this.data > 100 ? 100 : this.data;
      this.chartRenderFn([this.data]);
    }
  }

  @HostListener('window:resize') onresize() {
    this.chartRenderFn([this.data]);
  }
}
