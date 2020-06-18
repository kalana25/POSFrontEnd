import { PurchaseOrder } from './purchase-order';
import { PurchaseOrderDetailFullItem } from './purchase-order-detail-fullInfo';
import { Supplier } from 'src/app/setup/models/supplier';


export class PurchaseOrderFullInfo extends PurchaseOrder {
    public items:Array<PurchaseOrderDetailFullItem>;
    public supplier:Supplier;
}