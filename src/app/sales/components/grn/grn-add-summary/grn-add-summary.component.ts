import { Component, OnInit,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GrnItemExpansionPanelModel } from 'src/app/sales/models/grn-item-expansion-panel';

@Component({
  selector: 'app-grn-add-summary',
  templateUrl: './grn-add-summary.component.html',
  styleUrls: ['./grn-add-summary.component.css']
})
export class GrnAddSummaryComponent implements OnInit {
  @Input() public GrnHeader:FormGroup;
  @Input() public GrnItems:Array<GrnItemExpansionPanelModel>;
  @Input() public AdditionalItems:Array<GrnItemExpansionPanelModel>;
  constructor() { }

  ngOnInit() {
  }





}
