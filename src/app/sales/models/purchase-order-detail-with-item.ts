import { PurchaseOrderDetail } from './purchase-order-detail';
import { Item } from 'src/app/shared/models/item';


export class PurchaseOrderDetailWithItem extends PurchaseOrderDetail {
    item:Item;
}