import { BaseEntity } from 'src/app/core/base-entity';


export class InventoryHeaderBase extends BaseEntity {
    public itemId:number;
    public quantity:number;
    public baseUnitId:number;
    public reOrderLevel:number;
}