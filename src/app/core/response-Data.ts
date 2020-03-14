import { BaseEntity } from './base-entity';

export class ResponseData <T extends BaseEntity>
{
    page:number;
    pageSize:number;
    pageCount:number;
    TotalCount:number;
    items:Array<T>;
}