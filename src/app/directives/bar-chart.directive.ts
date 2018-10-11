import { Directive, ElementRef, Input, OnChanges, HostListener } from '@angular/core';

declare let d3: any;

@Directive({
  selector: '[appBarChart]'
})
export class BarChartDirective implements OnChanges {
  @Input() data;
  @Input() getTab;

  constructor(private el: ElementRef) { }

  // chart function
  performanceChart() {
    this.el.nativeElement.innerHTML = '';

    const margin = 50,
      width = d3.select(this.el.nativeElement).node().getBoundingClientRect().width - 46,
      h = 220,
      p = 50;
    const calWidth = d3.select(this.el.nativeElement).node().getBoundingClientRect().width;

    const calculatedWidth = this.data.length > 6 ? width + 56 * (this.data.length - 6) : width;
    if (this.data.length > 6) {
      d3.select('.bar-chart-graph').attr('overflow-x', 'scroll');
    }


    const svg = d3
      .select(this.el.nativeElement)
      .append('svg')
      .attr('width', calculatedWidth)
      .attr('height', h + margin * 2)
      .append('g')
      .attr('transform', 'translate(' + margin + ',' + (margin - 30) + ')');

    const x0 = d3.scale.ordinal()
      .rangeRoundBands([0, calculatedWidth], 0.5, 0.5);

    const x1 = d3.scale.ordinal();

    const y = d3.scale.linear()
      .range([h, 0]);

    let tranlateDistance = -30;

    const xAxis = d3.svg.axis()
      .scale(x0)
      .orient('bottom');

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .tickFormat(d3.format('.2s'));

    const options = d3.keys(this.data[0]).filter(function (key) { return key !== 'label'; });

    this.data.forEach(function (d) {
      d.valores = options.map(function (name) {
        return {
          name: name,
          value: +d[name],
          label: d.label
        };
      });
    });

    const orgLabels = {};

    x0.domain(this.data.map(function (d) {
      let label;
      if (d.label.length > 9) {
        label = d.label.slice(0, 3) + '...' + d.label.substr(d.label.length - 3);
      }
      else {
        label = d.label;
      }
      orgLabels[label] = d.label;
      d.label = label;
      return d.label;
    }));

    x1.domain(options).rangeRoundBands([0, 100]);
    y.domain([0,
      d3.max(this.data, d => {
        const maxBar = Math.ceil(d.Group1);
        if (maxBar <= 8) {
          return 8;
        } else {
          return maxBar;
        }
      })
    ]);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (h) + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6);

    const bar = svg.selectAll('.bar')
      .data(this.data)
      .enter().append('g')
      .attr('class', 'rect')
      .attr('transform', function (d) { return 'translate(' + x0(d.label) + ',0)'; });

    const color = d3.scale.ordinal().range(['#5584FF']);

    const svgDefs = svg.append('defs');

    const mainGradient = svgDefs.append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient.append('stop')
      .attr('class', 'stop-left')
      .attr('offset', '0');

    mainGradient.append('stop')
      .attr('class', 'stop-right')
      .attr('offset', '1');

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

    bar.selectAll('rect')
      .data(function (d) {
        return d.valores;
      })
      .enter().append('rect')
      .attr('width', '42')
      .attr('x', function (d) { return x1(d.name); })
      .attr('y', function (d) { return y(d.value); })
      .attr('value', function (d) { return d.name; })
      .attr('height', function (d) { return h - y(d.value); })
      .style('fill', function (d) { return color(d.name); })
      .on('mouseover', function (d) {
        tooltip.transition().style('opacity', 1);
        tooltip.html(
          '<div style=\'color:#0146F9\'>' +
          d.label + '</div>' +
          '<div style=\'color:#0146F9\'>' +
          d.value + '</div>'
        ).style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY) + 'px');
      })
      .on('mouseout', function (d) {
        tooltip.transition()
          .style('opacity', 0);
      });


    if (this.getTab === 'performance') {
      svg
        .append('text')
        .text('Performance')
        .attr('transform', 'rotate(-90),translate( ' + h / 4 + ',-50 )')
        .attr('x', -(h / 2))
        .attr('y', 14);
    }

    if (this.getTab === 'progress') {
      svg
        .append('text')
        .text('Progress')
        .attr('transform', 'rotate(-90),translate( ' + h / 4 + ',-50 )')
        .attr('x', -(h / 2))
        .attr('y', 14);
    }
  }

  ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      this.performanceChart();
    }
  }

  @HostListener('window:resize') onresize() {
    this.performanceChart();
  }
}
