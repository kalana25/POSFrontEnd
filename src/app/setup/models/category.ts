import { BaseEntity } from 'src/app/core/base-entity';
export class Category extends BaseEntity {
    code:string;
    name:string;
    description:string;
    parentCategoryId:number;
    level:number;
    active:boolean;
}
