import {Observable} from 'rxjs';

export interface IAction
{
    Execute():Observable<any>;
}