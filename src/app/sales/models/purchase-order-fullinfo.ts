import { PurchaseOrder } from './purchase-order';
import { PurchaseOrderDetailWithItem } from './purchase-order-detail-withItem';


export class PurchaseOrderFullInfo extends PurchaseOrder {
    public items:Array<PurchaseOrderDetailWithItem>;
}