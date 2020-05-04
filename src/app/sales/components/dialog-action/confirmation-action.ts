import { IAction } from '../../../core/IAction';
import { Observable, from } from 'rxjs';
import { PurchaseOrderService } from '../../services/purchase-order.service';

export class PurchaseOrderDeleteAction implements IAction {

    constructor(
        public purchaseOrderService:PurchaseOrderService,
        public id:number) {
    }
    
    Execute(): Observable<any> {
        return this.purchaseOrderService.delete(this.id)
    }
}