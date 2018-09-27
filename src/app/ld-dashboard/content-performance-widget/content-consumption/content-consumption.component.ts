import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

import { FaIconService } from '@fortawesome/angular-fontawesome';
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: "app-content-consumption",
    templateUrl: "./content-consumption.component.html",
    styleUrls: ["./content-consumption.component.scss"]
})
export class ContentConsumptionComponent implements OnInit {
    @Input() contentData;
    @Output() sortBy = new EventEmitter<any>();

    //font-awesome classes
    faSort = faSort;
    faStar = faStar;

    sortOrder: string = 'contentName';

    constructor(private faIconService: FaIconService) {
        this.faIconService.defaultPrefix = 'far';
    }

    sortByFn(sortByName) {
        this.sortOrder = sortByName;
        this.sortBy.emit(this.sortOrder);
    }

    ngOnInit() { }
}
