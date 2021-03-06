import { Component, OnInit,ViewChild } from '@angular/core';
import { PurchaseOrderService } from '../../../services/purchase-order.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { PurchaseOrderFullInfo } from '../../../models/purchase-order-fullinfo';
import { Product } from '../../../../setup/models/product';
import { MatTable } from '@angular/material';
import { PurchaseOrderDetailFullItem } from '../../../models/purchase-order-detail-fullInfo';
import { MatDialog } from '@angular/material/dialog';
import { PoDetailPickerComponent } from '../../po-detail-picker/po-detail-picker.component';
import { PurchaseOrderEditItemComponent } from '../purchase-order-edit-item/purchase-order-edit-item.component';
import { PurchaseOrderSave } from 'src/app/sales/models/purchase-order-save';
import { PurchaseOrderDetail } from 'src/app/sales/models/purchase-order-detail';
import { RouteStateService } from 'src/app/shared/services/route-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Supplier } from 'src/app/setup/models/supplier';
import { SupplierService } from 'src/app/setup/services/supplier.service';
import { MeasurementService } from 'src/app/setup/services/measurement.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-purchase-order-edit',
  templateUrl: './purchase-order-edit.component.html',
  styleUrls: ['./purchase-order-edit.component.css']
})
export class PurchaseOrderEditComponent implements OnInit {
  public id:string;
  public IsLoading:boolean;
  public purchaseOrder:PurchaseOrderFullInfo
  public editForm:FormGroup;
  public supplierList:Array<Supplier>;
  public displayedColumns: string[] = ['code', 'name', 'barcode','unit','quantity','price','action'];

  @ViewChild(MatTable,{
    static:false
  })
  private tableReference:MatTable<PurchaseOrderDetailFullItem>

  constructor(
    protected dialog:MatDialog,
    protected snackBar:MatSnackBar,
    protected fb:FormBuilder,
    protected router:Router,
    protected route:ActivatedRoute,
    private measurementService:MeasurementService,
    protected supplierService:SupplierService,
    protected routerService:RouteStateService,
    protected purchaseOrderService:PurchaseOrderService
  ) { }

  ngOnInit() {
    this.initForm();
    this.IsLoading= true;
    this.route.params.subscribe(para=>{
      this.id = para['id'];
      this.getPurchaseOrderInfo();
    });
    this.GetSupplierData();
  }
  
  private getPurchaseOrderInfo() {    
    this.purchaseOrderService.getWithFullInfo(Number(this.id))
    .subscribe(res=>{
      this.purchaseOrder = res;
      this.IsLoading = false;
      this.patchForm();
    },err=>{
      console.error(err);
    })
  }

  private patchForm() {
    this.editForm.patchValue({
      id:this.purchaseOrder.id,
      code:this.purchaseOrder.code,
      date:this.purchaseOrder.date,
      deliveryDate:this.purchaseOrder.deliveryDate,
      createdByName:this.purchaseOrder.createdByName,
      totalPrice:this.purchaseOrder.totalPrice,
      supplierId:this.purchaseOrder.supplier.id
    })
  }

  private initForm() {
    this.editForm = this.fb.group({
      id:[''],
      code:['',Validators.required],
      date:['',Validators.required],
      deliveryDate:[''],
      supplierId:['',Validators.required],
      createdByName:['',Validators.required],
      totalPrice:['',Validators.required]
    });
  }

  public OnItemRemove(model:PurchaseOrderDetailFullItem){
    let index:number = this.purchaseOrder.items.findIndex(x=>x.itemId===model.itemId);
    if(index!==-1) {
      // re calculate grant total
      this.purchaseOrder.totalPrice -=model.unitPrice * model.quantity;
      this.editForm.get('totalPrice').patchValue(this.purchaseOrder.totalPrice);
      this.purchaseOrder.items.splice(index,1);
      this.tableReference.renderRows();
    }
  }

  public OnItemEdit(column:PurchaseOrderDetailFullItem) {
    this.measurementService.getByItem(column.itemId)
    .subscribe(mesRes=>{
      if(mesRes.length) {

        const dialogRef = this.dialog.open(PurchaseOrderEditItemComponent,{
          data:{'poItem':column,'measurement':mesRes},
          width:'230px'
        });

        dialogRef.afterClosed().subscribe(res=>{
          if(res){
            //re calculate grand total
            let total:number =0;
            this.purchaseOrder.items.forEach(item=>{
              total +=item.quantity*item.unitPrice;
            })
            this.tableReference.renderRows();
            this.editForm.get('totalPrice').patchValue(total);
          }
        });

      } else {
        this.snackBar.open("Please configure the measurements","OK",{duration:2500});
      }
    },err=>{
      console.error(err);
    })
  }

  public OnGoBack() {
    this.router.navigate(['../../purchase-order-list'],{relativeTo:this.route});
  }

  public OnSelectProduct(product:Product) {

    this.measurementService.getByItem(product.id)
    .subscribe(mesRes=>{
      if(mesRes.length>0) {

        let dialogRef = this.dialog.open(PoDetailPickerComponent,
        {
          data:{'product':product,'measurement':mesRes},
          width:'230px'
        });

        dialogRef.afterClosed().subscribe(res=>{
          if(res) {
            // re calculate total Price
            this.purchaseOrder.items.push(res);
            this.tableReference.renderRows();
            this.purchaseOrder.totalPrice +=res.quantity*res.unitPrice;
            this.editForm.get('totalPrice').patchValue(this.purchaseOrder.totalPrice); 
          }
        });

      } else {
        this.snackBar.open("Please configure the measurements","OK",{duration:2500});
      }
    }, err=>{
      console.error(err);      
    });

  }

  public OnSave() {
    if(this.editForm.valid) {
      //Access service and save
      if(this.purchaseOrder.items.length==0) {
        this.snackBar.open("Please select items","OK",{duration:2500});
      } else {
        //Wrappe to save model
        const model = new PurchaseOrderSave();
        model.code = this.editForm.get('code').value;
        model.totalPrice = Number(this.editForm.get('totalPrice').value);
        model.date = this.editForm.get('date').value;
        model.deliveryDate = this.editForm.get('deliveryDate').value;
        model.supplierId = this.editForm.get('supplierId').value;
        let itemList:Array<PurchaseOrderDetail> = this.purchaseOrder.items.map(x=>{
          const item = new PurchaseOrderDetail();
          item.itemId = x.itemId;
          item.unitId = x.unitId;
          item.quantity = x.quantity;
          item.unitPrice = x.unitPrice;
          item.isBaseUnit = x.isBaseUnit;
          return item;
        });
        model.items = itemList;
        this.purchaseOrderService.update(this.purchaseOrder.id,model)
        .subscribe(res=>{
          this.router.navigate(['../../purchase-order-list'],{relativeTo:this.route});
        },err=>{
          console.error(err);
        })
      }
    }
  }

  public GetSupplierData() {
    this.supplierService.get("findall")
    .subscribe(res=>{
      this.supplierList = res;
    },err=>{
      console.error(err);
    })
  }

}
