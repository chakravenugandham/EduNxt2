import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-halfdonut',
  templateUrl: './halfdonut.component.html',
  styleUrls: ['./halfdonut.component.scss']
})
export class HalfdonutComponent implements OnInit, OnChanges {

  @Input() config: graphConfig;

  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.config && changes.config.currentValue) {
      this.config = changes.config.currentValue;
    }
  }

  ngOnInit() {
  }

}

export class graphConfig {
  widgetName: string;
  halfDonutGraphValue: number;
  expectedChange: boolean;
}
