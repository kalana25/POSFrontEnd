import { IAction } from 'src/app/core/IAction'
import { Observable } from 'rxjs';
import { CategoryService } from '../../../services/category.service';

export class CategoryDeleteAction implements IAction
{
    constructor(
        public categoryService:CategoryService,
        public id:number
    ) { }
    Execute(): Observable<any> {
       return this.categoryService.delete(this.id)
    }
    
}