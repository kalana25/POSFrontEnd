import { BaseEntity } from 'src/app/core/base-entity';

export class MeasurementBase extends BaseEntity {
    name:string;
    comment:string;
    symbol:string;
    quantity:number;
}