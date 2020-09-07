import { InventoryHeaderBase } from './inventory-header-base';
import { Unit } from './unit';
import { Item } from 'src/app/shared/models/item';


export class InventoryPagination extends InventoryHeaderBase {
    public createdOn:Date;
    public updatedOn:Date;
    public createdByName:string;
    public updatedByName:string;
    public unit:Unit;
    public item:Item;
}