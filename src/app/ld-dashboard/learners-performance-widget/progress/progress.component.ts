import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
// import { d3 } from "d3v4";
declare let d3: any;

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.scss"]
})
export class ProgressComponent implements OnInit, OnChanges {
  @Input() progressData;
  @Input() batches: string[];
  barChartData: any;
  batchNames = [];
  getTab = '';


  getTabData = "progress";
  constructor() { }

  yaxis() {

    let margin = 50, height = 220;
    let svg = d3.select('#y-axis-one')
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
      .call(yAxis);
    // .append("text")
    // .attr("transform", "rotate(-90)");

    svg.append('text')
      .text('Progress')
      .attr('transform', 'rotate(-90),translate( ' + height / 4 + ',-50 )')
      .attr('x', -(height / 2))
      .attr('y', 14);

  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.progressData) {
      this.barChartData = this.progressData;
      this.batchNames = this.batches;
      this.getTab = this.getTabData;

      this.yaxis();
    }
  }
}
