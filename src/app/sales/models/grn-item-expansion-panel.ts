import { PurchaseOrderDetailFullItem } from './purchase-order-detail-fullInfo';
import { FormGroup } from '@angular/forms';


export class GrnItemExpansionPanelModel {

    constructor(
        private purchasOrderDetail:PurchaseOrderDetailFullItem,
        private grnItemFormGroup:FormGroup,
        private isConfirmed:boolean,
        private expand:boolean ) {

    }
    
    
}