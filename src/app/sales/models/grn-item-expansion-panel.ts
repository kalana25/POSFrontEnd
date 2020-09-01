import { PurchaseOrderDetailFullItem } from './purchase-order-detail-fullInfo';
import { FormGroup } from '@angular/forms';
import { Unit } from './unit';


export class GrnItemExpansionPanelModel {

    constructor(
        public purchasOrderDetail:PurchaseOrderDetailFullItem,
        public grnItemFormGroup:FormGroup,
        public unitList:Array<Unit>,
        public isConfirmed:boolean,
        public expand:boolean,
        public profitSetting:ProfitSetterInfoModel ) {

    }
    
    
}

export class ProfitSetterInfoModel
{
    public orderedAmountText:string;
    public purchasePricePerUnit:number;
    public sellingPricePerUnit:number;
    public profit:number;

}