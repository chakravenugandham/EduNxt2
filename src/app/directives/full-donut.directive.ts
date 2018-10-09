import { Directive, ElementRef, Input, OnChanges, HostListener, OnInit } from '@angular/core';
import * as d3 from "d3v4";

@Directive({
  selector: '[appFullDonut]'
})
export class FullDonutDirective implements OnInit {
  @Input() data: any;
  @Input() graphSize: any;
  @Input() Schedule: any;

  constructor(private el: ElementRef) { }

  chartRenderFn(chartData) {
    this.el.nativeElement.innerHTML = "";

    let w = d3
      .select(this.el.nativeElement)
      .node()
      .getBoundingClientRect().width;

    let h: number;
    if (this.graphSize === 'smallGraph') {
      h = 130;
    } else {
      h = 240;
    }

    let backgroundArc = d3
      .arc()
      // .innerRadius(82)
      // .outerRadius(100)

      .innerRadius(this.graphSize === 'smallGraph' ? 45 : 82)
      .outerRadius(this.graphSize === 'smallGraph' ? 55 : 100)
      .cornerRadius(10)
      .startAngle(-90 * (Math.PI / 90))
      .endAngle(90 * (Math.PI / 90));

    let mainArc = d3
      .arc()
      // .innerRadius(82)
      // .outerRadius(100)
      .innerRadius(this.graphSize === 'smallGraph' ? 45 : 82)
      .outerRadius(this.graphSize === 'smallGraph' ? 55 : 100)
      .cornerRadius(10)
      .startAngle(-90 * (Math.PI / 90))
      .endAngle(function (d) {
        if (<any>d == 50) {
          return 0;
        } else if (<any>d > 50) {
          return ((<any>d - 50) * 1.8 * Math.PI) / 90;
        } else if (<any>d < 50) {
          return -90 * (Math.PI / 90) + (<any>d * 1.8 * Math.PI) / 90;
        }
      });



    let donutWidth = 280;
    let donutHeight = 170;
    let svg = d3
      .select(this.el.nativeElement)
      .append("svg")
      .attr("width", donutWidth)
      .attr("height", donutHeight)
      .attr("style", "padding-left:0%; padding-top:0%;margin-top:-47px;margin-left:-20px;");

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

    let graph_color = this.Schedule == 'onSchedule' ? "#00ff00" : "#ff4e00 ";

    charts
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0em')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(function (d) {
        return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      });
    charts
      .append("path")
      .attr("d", <any>mainArc)
      .attr("fill", graph_color);
  }

  ngOnInit() {
    this.chartRenderFn([this.data]);
  }

}
