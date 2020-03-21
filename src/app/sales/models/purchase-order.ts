import { BaseEntity } from '../../core/base-entity';
export class PurchaseOrder extends BaseEntity {
    code:string;
    date:Date;
    userId:number;
    totalPrice:number;
}
