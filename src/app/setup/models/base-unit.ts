import { BaseEntity } from 'src/app/core/base-entity';

export class BaseUnit  extends BaseEntity{
    name:string;
    description:string;
    symbol:string;
}