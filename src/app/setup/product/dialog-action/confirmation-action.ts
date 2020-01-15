import { IAction } from '../../../core/IAction'
import { Observable, from } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

export class ProductDeleteAction implements IAction
{
    constructor(
        public productService:ProductService,
        public id:number
    ) { }
    Execute(): Observable<any> {
       return this.productService.delete(this.id)
    }
    
}