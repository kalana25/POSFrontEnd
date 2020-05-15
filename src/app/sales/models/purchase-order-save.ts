import { BaseEntity } from '../../core/base-entity';
import { PurchaseOrderDetail } from './purchase-order-detail';
export class PurchaseOrderSave extends BaseEntity {
    code:string;
    date:Date;
    totalPrice:number;
    createdBy:string;
    deliveryDate:Date;
    items:Array<PurchaseOrderDetail>;
}