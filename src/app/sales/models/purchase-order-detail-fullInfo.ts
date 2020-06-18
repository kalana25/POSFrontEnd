import { PurchaseOrderDetail } from './purchase-order-detail';
import { Item } from './item';
import { Unit } from './unit';


export class PurchaseOrderDetailFullItem extends PurchaseOrderDetail{
    public item:Item;
    public unit:Unit;
}