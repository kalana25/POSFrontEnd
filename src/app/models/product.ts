import { BaseEntity } from '../core/base-entity';
export class Product extends BaseEntity{
    code:string;
    name:string;
    categoryId:number;
    price:number;
    barcode:number;
    active:boolean;
}
