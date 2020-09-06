import { Grn } from './grn';
import { PurchaseOrder } from './purchase-order';
import { GrnDetailFullInfo } from './grn-detail-fullInfo';


export class GrnFullInfo extends Grn {
    time:Date;
    createdOn:Date;
    createdBy:string;
    createdByName:string;
    purchaseOrder:PurchaseOrder;
    items:Array<GrnDetailFullInfo>;
}