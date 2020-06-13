import { BaseEntity } from 'src/app/core/base-entity';
export class Product extends BaseEntity{
    code:string;
    name:string;
    categoryId:number;
    price:number;
    reOrderLevel:number;
    barcode:string;
    active:boolean;
}
