import { Directive, ElementRef, Input, OnChanges, HostListener } from '@angular/core';
import * as d3 from 'd3v4';

@Directive({
  selector: '[appDonutChart]'
})
export class DonutChartDirective implements OnChanges {
  @Input() data: any;
  @Input() graphSize: string;

  constructor(private el: ElementRef) { }

  // chart function
  chartRenderFn(chartData) {
    this.el.nativeElement.innerHTML = '';

    const w = d3
      .select(this.el.nativeElement)
      .node()
      .getBoundingClientRect().width;
    let h: number;
    if (this.graphSize === 'smallGraph') {
      h = 130;
    } else {
      h = 240;
    }

    const arc = d3
      .arc()
      // .innerRadius(90)
      // .outerRadius(100);
      .innerRadius(this.graphSize === 'smallGraph' ? 40 : 90)
      .outerRadius(this.graphSize === 'smallGraph' ? 55 : 100);

    const svg = d3
      .select(this.el.nativeElement)
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    const g = svg
      .append('g')
      .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

    const arcs = d3.pie().value(function (d) {
      return d.number;
    })(chartData);

    const div = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('padding', '5px')
      .style('border', '1px #5584ff solid')
      .style('border-radius', '2px')
      .style('opacity', '0')
      .style('font-size', '12px');


    const arcPath = g
      .selectAll('path')
      .data(arcs)
      .enter();

    arcPath
      .append('path')
      .style('fill', function (d, i) {
        return d.data.color;
      })
      .attr('d', arc);

    arcPath
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0em')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(function (d) {
        if (d.data.type === 'classC') {
          return d.data.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
      })
      .on('mouseover', function (d) {
        var tooltipvalue = d.data.type === 'classC' ? 'Haven\'t Started' : ''
        tooltip.transition().style('opacity', 1);
        tooltip.html('<div style=\'color:#0146F9\'>' + tooltipvalue + '</div>' + '<div style=\'color:#0146F9\'>' + d.value + '</div>').style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY) + 'px');
      })
      .on('mouseout', function (d) {
        tooltip.transition()
          .style('opacity', 0);
      });

    arcPath
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .style('font-weight', 'bold')
      .text(function (d) {
        if (d.data.type === 'classC') {
          return 'Haven\'t Started';
        }
      });
  }


  ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      this.chartRenderFn(this.data);
    }
  }

  @HostListener('window:resize') onresize() {
    this.chartRenderFn(this.data);
  }
}
