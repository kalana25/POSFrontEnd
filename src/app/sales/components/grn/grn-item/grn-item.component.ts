import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { PurchaseOrderPagination } from 'src/app/sales/models/purchase-order-pagination';
import { FormGroup } from '@angular/forms';
import { PurchaseOrderService } from 'src/app/sales/services/purchase-order.service';
import { PurchaseOrderDetailFullItem } from 'src/app/sales/models/purchase-order-detail-fullInfo';

@Component({
  selector: 'app-grn-item',
  templateUrl: './grn-item.component.html',
  styleUrls: ['./grn-item.component.css']
})
export class GrnItemComponent implements OnInit,OnChanges {
  @Input() grnHeaderForm:FormGroup
  public purchaseOrderDetails:Array<PurchaseOrderDetailFullItem>;
  public IsItemLoading:boolean = false;
  displayedColumns: string[] = ['name','barcode','quantity','unit','action'];

  constructor(
    private purchaseOrderService:PurchaseOrderService
  ) { }

  ngOnChanges() {
    if(this.grnHeaderForm) {
      this.IsItemLoading = true;
      const poId:number = this.grnHeaderForm.get('purchaseOrderId').value;
      this.purchaseOrderService.getDetailsWithFullInfo(poId)
      .subscribe(res=>{
        this.IsItemLoading = false;
        this.purchaseOrderDetails = res;
      },err=>{
        console.error(err);
      })
    }
    
  }

  ngOnInit() {
    
  }

}
