import { BaseEntity } from '../../core/base-entity';

export class PurchaseOrderPagination extends BaseEntity{
    public referenceId:number;
    public code:string;
    public date:Date;
    public deliveryDate:Date;
    public status:number;
    public supplierName:string;
    public totalPrice:number;
    public createdByName:string;
}