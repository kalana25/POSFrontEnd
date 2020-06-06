import { IAction } from 'src/app/core/IAction'
import { Observable, from } from 'rxjs';
import { DiscountService } from '../../../services/discount.service';

export class DiscountDeleteAction implements IAction
{
    constructor(
        public discountService:DiscountService,
        public id:number
    ) { }
    Execute(): Observable<any> {
       return this.discountService.delete(this.id)
    }
    
}