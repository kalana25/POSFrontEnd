import { BaseEntity } from 'src/app/core/base-entity';

export class Item extends BaseEntity{
    code:string;
    name:string;
    categoryId:number;
    price:number;
    barcode:string;
    active:boolean;
}