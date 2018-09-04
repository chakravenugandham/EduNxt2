import { Component, OnInit, Input, OnChanges } from "@angular/core";
import * as d3 from "d3v4";
import * as _ from "underscore";
import { LdDashboardService } from "../../services/ld-dashboard.service";

@Component({
  selector: "app-active-users",
  templateUrl: "./active-users.component.html",
  styleUrls: ["./active-users.component.scss"]
})
export class ActiveUsersComponent implements OnInit {

  //variable declaration
  chartData = [];

  // dataSet = [
  //     [1518307200000, 300, 400],
  //     [1518393600000, 350, 550],
  //     [1518480000000, 400, 600],
  //     [1518566400000, 450, 650],
  //     [1518652800000, 500, 700],
  //     [1518739200000, 550, 750],
  //     [1518825600000, 600, 800],
  //   ];
  responseData = [];
  spinner_loader = false;
  noDataFlag = false;

  constructor(private dashboardService: LdDashboardService) {
    this.dashboardService.refreshAPI.subscribe(result => {
      this.getActiveUsersData();
    });

    this.dashboardService.dateChangeAPI.subscribe(result => {
      this.getActiveUsersData();
    });

    this.dashboardService.tenantNameAPI.subscribe(result => {
      this.getActiveUsersData();
    });

    this.dashboardService.refreshReportAPI.subscribe(result => {
      this.getActiveUsersData();
    });
  }


  //chart function
  usersChartRender(dataSet) {
    d3.select("#activeUserGraph svg").remove();
    let w = d3.select("#activeUserGraph").node() ? d3.select("#activeUserGraph").node().getBoundingClientRect().width : 300;
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
      .style("stroke-opacity", "0.7")
      .style("shape-rendering", "crispEdges")
      .style("stroke-dasharray", "5, 5")
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
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#ff4e00")
      .style("stroke-width", "6px");

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
      .attr("d", line2) // Calls the line generator
      .style("fill", "none")
      .style("stroke", "#5584ff")
      .style("stroke-width", "6px");

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

    if (dataSet.length == 0) {
      d3.select("#activeUserGraph svg").remove();
    }
  }

  date;
  timeStamp;
  activeLearners;
  activeFacultiesAndAdmins;

  customArray = [];
  //service call for apis
  getActiveUsersData() {
    this.spinner_loader = true;
    this.chartData = [];
    this.dashboardService.getActiveUsersData().subscribe((response: any) => {
      this.responseData = response.data;
      this.spinner_loader = false;
      this.noDataFlag = this.responseData.length == 0 ? true : false;
      // if (this.responseData.length > 0) {
      for (var i = 0; i < this.responseData.length; i++) {
        this.date = new Date(this.responseData[i].date);
        // if (this.responseData.length == 1) {
        //   this.date = new Date(this.responseData[i].date);

        //   this.customArray.push(
        //     [this.timeStamp = this.date.getTime() - 1,
        //     this.activeLearners = 0,
        //     this.activeFacultiesAndAdmins = 0],
        //     [this.timeStamp = this.date.getTime(),
        //     this.activeLearners = parseInt(this.responseData[i].learnerCount),
        //     this.activeFacultiesAndAdmins = parseInt(this.responseData[i].facultyCount)],
        //     [this.timeStamp = this.date.getTime() + 1,
        //     this.activeLearners = parseInt(this.responseData[i].learnerCount),
        //     this.activeFacultiesAndAdmins = parseInt(this.responseData[i].facultyCount)]
        //   );

        //   this.chartData = [...this.customArray];

        // }

        this.date = new Date(this.responseData[i].date);
        this.timeStamp = this.date.getTime();
        this.activeLearners = parseInt(this.responseData[i].learnerCount);
        this.activeFacultiesAndAdmins = parseInt(this.responseData[i].facultyCount);
        this.chartData.push([
          this.timeStamp,
          this.activeLearners,
          this.activeFacultiesAndAdmins
        ]);
      }
      console.log("before adding dup", this.chartData);
      if (this.chartData.length == 1) {
        this.chartData.unshift([
          (this.chartData[0][0] - 86400000),
          0,
          0
        ])
        // this.chartData.push([
        //   (this.chartData[1][0] + 86400000),
        //   0,
        //   0
        // ])
      }
      console.log("after adding dup", this.chartData);

      this.usersChartRender(this.chartData);
      // }

    });
  }

  ngOnchanges(changes: any) {
    if (changes.chartData.currentValue != changes.chartData.previousValue) {
      this.getActiveUsersData();
    }
  }

  ngOnInit() {
    //service call initiated
    this.getActiveUsersData();
  }
}
