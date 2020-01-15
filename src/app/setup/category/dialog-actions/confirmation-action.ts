import { IAction } from '../../../core/IAction'
import { Observable, from } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

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