import { BaseEntity } from '../../core/base-entity';
import { SupplierEditComponent } from 'src/app/setup/supplier/supplier-edit/supplier-edit.component';
export class PurchaseOrderDetail extends BaseEntity {
    itemId:number;
    quantity:number;
    unit:number;
}
