import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PurchaseOrderFullInfo } from '../../models/purchase-order-fullinfo';

@Component({
  selector: 'app-purchase-order-list-detail',
  templateUrl: './purchase-order-list-detail.component.html',
  styleUrls: ['./purchase-order-list-detail.component.css']
})
export class PurchaseOrderListDetailComponent implements OnInit {

  private Id:number;
  public IsLoading:boolean;
  public result:PurchaseOrderFullInfo
  public displayedColumns: string[] = ['code', 'name', 'price', 'barcode','quantity','unit'];

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private purchaseOrderService:PurchaseOrderService
  ) { }

  ngOnInit() {
    this.IsLoading = true;
    this.Id= Number(this.route.snapshot.paramMap.get('id'));
    this.purchaseOrderService.getWithFullInfo(this.Id)
    .subscribe(res=>{
      this.result = res;
      this.IsLoading= false;
    },err=>{
      console.error(err);
    });
  }

  public OnGoBack() {
    this.router.navigate(['../../purchase-order-list'],{relativeTo:this.route});
  }

}
