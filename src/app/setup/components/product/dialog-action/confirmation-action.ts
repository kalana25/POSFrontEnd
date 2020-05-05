import { IAction } from 'src/app/core/IAction'
import { Observable, from } from 'rxjs';
import { ProductService } from '../../../services/product.service';

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