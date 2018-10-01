import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-content-consumption",
    templateUrl: "./content-consumption.component.html",
    styleUrls: ["./content-consumption.component.scss"]
})
export class ContentConsumptionComponent implements OnInit {
    @Input() contentData;
    @Output() sortBy = new EventEmitter<any>();

    sortOrder: string = 'contentName';

    constructor() { }

    sortByFn(sortByName) {
        this.sortOrder = sortByName;
        this.sortBy.emit(this.sortOrder);
    }

    ngOnInit() { }
}
