import { BaseEntity } from '../core/base-entity';
export class Supplier extends BaseEntity {
    code:string;
    name:string;
    description:string;
    contactNo:string;
    telephone:string;
    email:string;
    comment:string;
    blackList:boolean;
    active:boolean;
}
