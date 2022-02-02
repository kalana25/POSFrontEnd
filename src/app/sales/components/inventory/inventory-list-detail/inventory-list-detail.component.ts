import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-inventory-list-detail',
  templateUrl: './inventory-list-detail.component.html',
  styleUrls: ['./inventory-list-detail.component.css']
})
export class InventoryListDetailComponent implements OnInit {
  @Input() data;
  displayedColumns: string[] = ['grnCode','grnDate','expDate','orderedQty','stockInDate','baseQty'];
  constructor() { }

  ngOnInit() {
  }

}

export class InventoryListDetailTableData
{
  constructor(
    public grnCode:string,
    public grnDate:Date,
    public stockInDate:Date,
    public expDate:Date,
    public grnQty:number,
    public orderedUnit:string,
    public baseUnitQty:number,
    public baseUnit:string
  ) {}
}
