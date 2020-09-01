import { GrnDetailBase } from './grn-detail-base';
import { Unit } from './unit';
import { PurchaseOrderDetailWithItem } from './purchase-order-detail-with-item';


export class GrnDetailFullInfo extends GrnDetailBase {
    id:number;
    unit:Unit;
    purchaseOrderDetail:PurchaseOrderDetailWithItem;
}