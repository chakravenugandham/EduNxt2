declare var google: any;

export class GoogleChartsBaseService {
  constructor() { }

  public setMap(someData: Array<any>) {
    google.charts.load("current", {
      packages: ["geochart"],
      mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
      var data = google.visualization.arrayToDataTable(someData);

      var options = {
        region: "IN",
        displayMode: "regions",
        resolution: "provinces",
        colors: ["#0146F9", "#5584FF"]
      };

      var chart = new google.visualization.GeoChart(
        document.getElementById("regions_div")
      );

      chart.draw(data, options);
    }
  }
}
