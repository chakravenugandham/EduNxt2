declare var google: any;


//import { Observable } from 'rxjs';
import { Subject } from 'rxjs';


export class GoogleChartsBaseService {
    constructor() { }
    public setMap(someData: Array<any>) {
        //google.charts.load('current', { 'packages': ['corechart'] });
        console.log(google);
        google.charts.load('current', {
            'packages': ['geochart'],
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable(someData);

            var options = {
                region: 'IN',
                displayMode: 'regions',
                resolution: 'provinces',
                colors: ['#0146F9', '#5584FF']
                //colors: [0xFF8747, 0xFFB581, 0xc06000] //orange colors

            };

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    }


}