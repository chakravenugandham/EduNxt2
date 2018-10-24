import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";

declare let d3: any;

@Component({
  selector: "app-performance",
  templateUrl: "./performance.component.html",
  styleUrls: ["./performance.component.scss"]
})
export class PerformanceComponent implements OnInit, OnChanges {
  @Input() performanceData;
  @Input() batches: string[];
  barChartData;
  batchNames = [];
  getTab = '';

  getTabData = "performance";
  constructor() { }

  yaxis() {

    let margin = 50, height = 220;
    let svg = d3.select('#y-axis')
      .append('svg')
      .attr('width', '50')
      .attr('height', '320')
      .append("g")
      .attr("transform", "translate(" + margin + "," + (margin - 20) + ")");

    let y = d3.scale.linear()
      .range([220, 0]);

    y.domain([0, 100]);

    let yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));


    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)");

    svg.append('text')
      .text('Performance')
      .attr('transform', 'rotate(-90),translate( ' + height / 4 + ',-50 )')
      .attr('x', -(height / 2))
      .attr('y', 14);

  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.performanceData) {
      this.barChartData = this.performanceData;
      this.batchNames = this.batches;
      this.getTab = this.getTabData;
      this.yaxis();
    }
  }
}
