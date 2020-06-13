import { BaseEntity } from 'src/app/core/base-entity';

export class Item extends BaseEntity{
    code:string;
    name:string;
    categoryId:number;
    reOrderLevel:number;
    barcode:string;
    active:boolean;
}