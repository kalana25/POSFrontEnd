import { BaseEntity } from '../../core/base-entity';
import { SupplierEditComponent } from '../../setup/components/supplier/supplier-edit/supplier-edit.component';

export class PurchaseOrderDetail extends BaseEntity {
    itemId:number;
    quantity:number;
    unitId:number;
    isBaseUnit:boolean;
    unitPrice:number;
}
