import { IAction } from 'src/app/core/IAction'
import { Observable, from } from 'rxjs';
import { BaseUnitService } from '../../../services/base-unit.service';

export class BaseUnitDeleteAction implements IAction
{
    constructor(
        public baseUnitService:BaseUnitService,
        public id:number
    ) { }
    Execute(): Observable<any> {
       return this.baseUnitService.delete(this.id)
    }
    
}