import { BaseEntity } from '../../core/base-entity';
export class PurchaseOrder extends BaseEntity {
    public code:string;
    public date:Date;
    public userId:number;
    public totalPrice:number;
}
