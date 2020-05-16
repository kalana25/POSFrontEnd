
import { PurchaseOrderDetail } from './purchase-order-detail';
export class PurchaseOrderSave {
    code:string;
    date:Date;
    totalPrice:number;
    deliveryDate:Date;
    items:Array<PurchaseOrderDetail>;
}