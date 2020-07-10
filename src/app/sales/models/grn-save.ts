import { GrnBase } from './grn-base';


export class GrnSave extends GrnBase {
    purchaseOrderId:number;
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
}