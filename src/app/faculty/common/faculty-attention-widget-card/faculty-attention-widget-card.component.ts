import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-faculty-attention-widget-card',
  templateUrl: './faculty-attention-widget-card.component.html',
  styleUrls: ['./faculty-attention-widget-card.component.scss']
})
export class FacultyAttentionWidgetCardComponent implements OnInit {

  @Input() config: Config;

  spinner_loader: boolean = false;
  noDataFlag: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}


export class Config {
  attentionName: string;
  attentionHeading1: string;
  attentionSubHeading1: string;
  attentionNumber1: number;
  attentionNumber1Text: string;
  attentionNumber2: number;
  attentionNumber2Text: string;
  attentionNumber3: string;
  attentionNumber3Text: string;
}
