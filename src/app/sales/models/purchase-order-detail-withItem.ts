import { PurchaseOrderDetail } from './purchase-order-detail';
import { Item } from './item';


export class PurchaseOrderDetailWithItem extends PurchaseOrderDetail{
    public item:Item;
}