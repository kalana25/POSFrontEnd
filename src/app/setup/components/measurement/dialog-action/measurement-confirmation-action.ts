import { IAction } from 'src/app/core/IAction'
import { Observable, from } from 'rxjs';
import { MeasurementService } from '../../../services/measurement.service';

export class MeasurementDeleteAction implements IAction
{
    constructor(
        public measurementService:MeasurementService,
        public id:number
    ) { }
    Execute(): Observable<any> {
       return this.measurementService.delete(this.id)
    }
    
}