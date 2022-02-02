import { InventoryHeaderBase } from './inventory-header-base';
import { Unit } from './unit';
import { Item } from 'src/app/shared/models/item';
import { InventoryDetailInfo } from './inventory-detail-Info';


export class InventoryFullInfo extends InventoryHeaderBase {
    public createdOn:Date;
    public updatedOn:Date;
    public createdByName:string;
    public updatedByName:string;
    public unit:Unit;
    public item:Item;
    public details:Array<InventoryDetailInfo>;
}