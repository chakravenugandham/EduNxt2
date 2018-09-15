import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { LdDashboardService } from "../services/ld-dashboard.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import * as d3 from "d3v4";
import * as _ from "underscore";

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: "app-active-user-widget",
  templateUrl: "./active-user-widget.component.html",
  styleUrls: ["./active-user-widget.component.scss"]
})
export class ActiveUserWidgetComponent implements OnInit {
  getTab = "activeUser";

  popclosing = false;

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;
  csvDownloadflag: boolean = false;

  constructor(private dashboardService: LdDashboardService, private modalService: NgbModal) {
  }

  tooltipText = 'Active users data';
  downloadLink: string = '';
  closeResult: string;

  //fliter object for payload

  filtersData = {
    routeTo: "",
    filters: false,
    search: false,
    viewDetails: false,
    filterList: ["location"],
    currentModule: "",
    viewDetailsFilters: false
  };

  filterbody = {};

  usersChartRender(dataSet) {
    d3.select("#activeUserGraph svg").remove();
    let w = d3.select("#activeUserGraph").node().getBoundingClientRect().width;
    var h = 250;
    var p = 70;

    // create xScale
    var xScale = d3
      .scaleTime()
      .domain(
        d3.extent(dataSet, function (d) {
          return d[0];
        })
      )
      .range([p, w - p / 2]);

    // create yScale
    var yMax = d3.max(dataSet, function (d) {
      var max = d[1] > d[2] ? d[1] : d[2];
      return max;
    });
    var yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([h - p, 15]);

    // create SVG
    var svg = d3
      .select("#activeUserGraph")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    function make_y_gridlines() {
      return d3.axisLeft(yScale).ticks(5);
    }

    // add the Y gridlines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(" + p + ", 0)")
      .call(
        make_y_gridlines()
          .tickSize(-(w - p - p / 2))
          .tickFormat("")
      );

    // create xAxis
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (h - p) + ")")
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat(d3.timeFormat("%d-%b"))
          .tickSizeInner(20)
          .tickPadding(6)
          .tickSize(15, 0)
      );

    // create yAxis
    svg
      .append("g")
      .attr("class", "y-axis axis")
      .attr("transform", "translate(" + p + ", 0)")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickFormat(function (d) {
            return d;
          })
          .tickSize(0, 0)
      );

    //d3 line generator
    var line = d3
      .line()
      .x(function (d) {
        return xScale(d[0]);
      })
      .y(function (d) {
        return yScale(d[1]);
      });

    var path = svg
      .append("path")
      .datum(dataSet)
      .attr("class", "line1")
      .attr("d", line);

    var line2 = d3
      .line()
      .x(function (d) {
        return xScale(d[0]);
      })
      .y(function (d) {
        return yScale(d[2]);
      });

    svg
      .append("path")
      .datum(dataSet) // Binds data to the line
      .attr("class", "line2") // Assign a class for styling
      .attr("d", line2); // Calls the line generator

    var dataPoints = {};
    //Creating dots
    svg
      .selectAll("circles")
      .data(dataSet)
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("cx", function (d) {
        var key = xScale(d[0]);
        dataPoints[key] = dataPoints[key] || [];
        dataPoints[key].push(d);
        return xScale(d[0]);
      })
      .attr("cy", function (d) {
        return yScale(d[1]);
      })
      .attr("fill", "white")
      .style("opacity", "0.5");

    svg
      .selectAll("circles")
      .data(dataSet)
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("cx", function (d) {
        var key = xScale(d[0]);
        dataPoints[key] = dataPoints[key] || [];
        dataPoints[key].push(d);
        return xScale(d[0]);
      })
      .attr("cy", function (d) {
        return yScale(d[2]);
      })
      .attr("fill", "white")
      .style("opacity", "0.5");

    //vertical line
    var vertline = svg
      .append("line")
      .attr("class", "vertline")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", h - p)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("opacity", "0");

    svg
      .append("text")
      .text("No.of users")
      .attr("transform", "rotate(-90),translate( " + h / 8 + ",-10 )")
      .attr("x", -(h / 2))
      .attr("y", 20);

    svg
      .append("text")
      .text("Dates")
      .attr(
        "transform",
        "translate(" + (w - 104) + "," + (h - 10) + ")");

    svg.on("mousemove", function () {
      let mouseX = d3.event.pageX - p;
      vertline.attr("opacity", "1");
      var keys = _.keys(dataPoints).sort();
      var epsilon = (keys[1] - keys[0]) / 2;
      var nearest = _.find(keys, function (a) {
        return Math.abs(a - mouseX) <= epsilon;
      });
      if (nearest) {
        vertline.attr("x1", nearest).attr("x2", nearest);
        d3
          .select(".ttip-date")
          .html(d3.timeFormat("%b %d %Y")(new Date(dataPoints[nearest][0][0])));
        d3
          .select(".ttip-learners")
          .html("<span style='color:#0146F9'>" +
            dataPoints[nearest][0][1] + "</span> Active Learner"
          );
        d3
          .select(".ttip-faculty")
          .html("<span style='color:#0146F9'>" +
            dataPoints[nearest][0][2] + "</span> Active Faculty and admins"
          );
        var tooltip = d3.select(".tool-tip");
        tooltip.style("visibility", "visible");
        //tooltip.style("top", 150 + "px").style("left", nearest - 150 + "px");
        let xPosition = 0;
        if (d3.event.clientX > 300) {
          xPosition = nearest - 150;
        } else {
          xPosition = nearest;
        }
        tooltip.style("top", 150 + "px").style("left", xPosition + "px");
      }
    });

    svg.on("mouseout", function () {
      vertline.attr("opacity", "0");
      let tooltip = d3.select(".tool-tip");
      tooltip.style("visibility", "hidden");
    });
  }

  activeUsersFn() {
    this.getTab = "activeUser";
    this.tooltipText = 'Active users data';
    this.csvFormatFn();
  }

  modeDeliveryFn() {
    this.getTab = "modeDelivery";
    this.tooltipText = 'View Online vs Offline delivery over the last 30 days';
    this.csvFormatFn();
  }

  locationFn() {
    this.getTab = "location";
    this.tooltipText = 'Activity by Location';
    this.csvFormatFn();
  }

  getFilterObject($event) {
    this.filterbody = $event;
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  csvFormatFn() {
    this.csvDownloadflag = this.getTab != '' ? true : false
    if (this.getTab == 'activeUser') {
      this.downloadLink = this.dashboardService.getActiveUsersCsv();

    }
    else if (this.getTab = "modeDelivery") {
      this.downloadLink = this.dashboardService.getModeOfDeliveryCsv();
    }
    else if (this.getTab = "location") {
      this.downloadLink = this.dashboardService.getLocationCsv();
    }

  }

  downloadPdf() {
    let htmlTemp = document.getElementById("active-users");
    html2canvas(htmlTemp).then(canvas => {
      // Few necessary setting options  
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('./');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

      pdf.save('EduNxtReport.pdf'); // Generated PDF   
    });
    this.popclosing = true;
  }

  ngOnInit() {
    this.tooltipText = 'Active users data';
    this.activeUsersFn();
  }

}
