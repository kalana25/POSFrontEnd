import { of,Observable } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { HttpClient,HttpHeaders, HttpResponse} from '@angular/common/http';
import { BaseEntity } from './base-entity';
import { ResponseData } from './response-data';
import { RequestData } from './request-data';
import { stringify } from 'querystring';

const httpOptions ={
    headers:new HttpHeaders({'Content-Type':'application/json'})
};

export class ApiService <T extends BaseEntity> {

    constructor(
        protected url:string,
        protected resource:string,
        protected http:HttpClient ) {

    }

    pagination(requestData:RequestData):Observable<ResponseData<T>>{
        const keys:Array<string> =[];
        Object.keys(requestData).forEach(element => {
            keys.push(`${element}=${requestData[element]}`);
        });
        let params = `?${keys.join('&')}`;
        return this.http.get<ResponseData<T>>(`${this.url}/${this.resource}/pagination/${params}`)
        .pipe(
            tap(_=>console.log('fetched resources')),
            //catchError(this.handlePaginationError('get paginated resources',ResponseData<T>))
        )
    }

    get(endPoint:string):Observable<T[]>{
        return this.http.get<T[]>(`${this.url}/${this.resource}/${endPoint}`)
        .pipe(
            tap(_=>console.log('fetched resources')),
            catchError(this.handleError('getResources',[]))
        )
    }

    getById(id:number):Observable<T> {
        return this.http.get<T>(`${this.url}/${this.resource}/${id}`)
        .pipe(
            tap(_=>console.log('fetched resource')),
            catchError(this.handleError<T>(`getbyId=${id}`))
        );
    }

    update(arg:T):Observable<T> {
        return this.http.put<T>(`${this.url}/${this.resource}/update/${arg.id}`,arg,httpOptions)
        .pipe(
          tap(_=>console.log(`updated ${typeof(arg)} ${arg .id }`)),
          catchError(this.handleError<T>(`update${typeof(arg)}`))
        );
    }

    add(arg:T):Observable<T> {
        return this.http.post<T>(`${this.url}/${this.resource}/save`,arg,httpOptions)
        .pipe(
          tap((resPro:T) => console.log(`added ${typeof(arg)} /w id${arg.id }`)),
          catchError(this.handleError<T>(`add${typeof(arg)}`))
        );
    }

    delete(arg:T | number): Observable<T> {
        const id = typeof arg === 'number' ? arg: arg.id;
        return this.http.delete<T>(`${this.url}/${this.resource}/delete/${id}`,httpOptions)
        .pipe(
          tap(_=>console.log(`deleted ${typeof(arg)} /w id ${id}`)),
          catchError(this.handleError<T>(`delete${typeof(arg)}`))
        );
    }

    protected handleError<T>(operation='operation',result?:T) {
        return (error:any):Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);     
        }
    }

    // private handlePaginationError <ResponseData<T>>(operation='operation',result?:ResponseData<T>) {
    //     return (error:ResponseData<T>):Observable<ResponseData<T>> => {
    //         console.error(error);
    //         console.log(`${operation} failed: ${error.message}`);
    //         return of(result as ResponseData<T>);     
    //     }
    // }
}
