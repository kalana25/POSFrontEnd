import { BaseEntity } from './base-entity';

export class ResponseData <T extends BaseEntity>
{
    page:number;
    pageSize:number;
    pageCount:number;
    totalCount:number;
    items:Array<T>;
}