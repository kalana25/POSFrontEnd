import { Unit } from './unit';
import { BaseEntity } from 'src/app/core/base-entity';
import { Grn } from './grn';


export class InventoryDetailInfo extends BaseEntity {
    public expireDate:Date;
    public stockInDate:Date;
    public quantity:number;
    public isBaseUnit:boolean;
    public sellingPrice:number;
    public purchasingPrice:number;
    public unit:Unit;
    public goodReceivedNote:Grn;
}