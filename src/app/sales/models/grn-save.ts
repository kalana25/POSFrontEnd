import { GrnBase } from './grn-base';


export class GrnSave extends GrnBase {
    purchaseOrderId:number;
    purchaseOrderStatus:number;
    items:Array<GrnDetailSave>;
}

export class GrnDetailSave {
    purchaseOrderDetailId:number;
    quantity:number;
    unitId:number;
    sellingPrice:number;
    PurchasingPrice:number;
    isBaseUnit:boolean;
    expireDate?:Date;
    itemId:number;
}