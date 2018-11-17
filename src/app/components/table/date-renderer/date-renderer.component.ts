import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-date-renderer',
  templateUrl: './date-renderer.component.html',
  styleUrls: ['./date-renderer.component.scss']
})
export class DateRendererComponent implements ViewCell, OnInit {

  @Input() value: string | number;
  @Input() rowData: any;

  constructor() { }

  ngOnInit() {
  }

}
