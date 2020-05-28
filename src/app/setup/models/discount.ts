import { BaseEntity } from 'src/app/core/base-entity';
export class Discount extends BaseEntity {
    startDate:Date;
    endDate:Date;
    rate:number;
}
