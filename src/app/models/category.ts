import { BaseEntity } from '../core/base-entity';
export class Category extends BaseEntity {
    name:string;
    description:string;
    parentCategoryId:number;
    level:number;
}
