import { BaseEntity } from '../../core/base-entity';
import { PurchaseOrderDetail } from './purchase-order-detail';
export class PurchaseOrderSave extends BaseEntity {
    code:string;
    date:Date;
    userId:number;
    totalPrice:number;
    items:Array<PurchaseOrderDetail>;
}