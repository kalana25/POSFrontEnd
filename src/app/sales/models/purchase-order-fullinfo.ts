import { PurchaseOrder } from './purchase-order';
import { PurchaseOrderDetailWithItem } from './purchase-order-detail-withItem';
import { Supplier } from 'src/app/setup/models/supplier';


export class PurchaseOrderFullInfo extends PurchaseOrder {
    public items:Array<PurchaseOrderDetailWithItem>;
    public supplier:Supplier;
}