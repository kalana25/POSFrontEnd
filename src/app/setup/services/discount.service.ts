import { Injectable } from '@angular/core';
import { AppSettingsService } from '../../core/app-settings.service'; 
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs'
import { catchError,tap } from 'rxjs/operators'
import { DiscountInfo } from '../models/discount-info';
import { DiscountSave } from '../models/discount-save';
import { DiscountWithItem } from '../models/discount-with-item';
import { RequestData } from 'src/app/core/request-data';
import { ResponseData } from 'src/app/core/response-Data';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private resource:string;

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) {
    this.resource = "Discounts";
  }

  pagination(requestData:RequestData):Observable<ResponseData<DiscountInfo>> {
    const keys:Array<string> =[];
    Object.keys(requestData).forEach(element => {
        keys.push(`${element}=${requestData[element]}`);
    });
    let params = `?${keys.join('&')}`;
    return this.http.get<ResponseData<DiscountInfo>>(`${this.config.apiUrl}/${this.resource}/pagination/${params}`)
    .pipe(
        tap(_=>console.log('fetched resources')),
        //catchError(this.handlePaginationError('get paginated resources',ResponseData<T>))
    )
  }

  getWithItemInfo(id:number):Observable<DiscountWithItem> {
    return this.http.get<DiscountWithItem>(`${this.config.apiUrl}/${this.resource}/fullinfo/find/${id}`)
    .pipe(
        tap(_=>console.log('fetched resource')),
        catchError(this.handleError<DiscountWithItem>(`getWithFullInfo=${id}`))
    );
  }

  add(model:DiscountSave):Observable<DiscountSave> {
    return this.http.post<DiscountSave>(`${this.config.apiUrl}/${this.resource}/save`,model,httpOptions)
    .pipe(
      tap((resPro:DiscountSave) => console.log(`added ${typeof(resPro)} /w id${resPro.id }`)),
      catchError(this.handleError<DiscountSave>(`add${typeof(model)}`))
    );
  }

  delete(model:DiscountInfo | number): Observable<DiscountInfo> {
    const id = typeof model === 'number' ? model: model.id;
    return this.http.delete<DiscountInfo>(`${this.config.apiUrl}/${this.resource}/delete/${id}`,httpOptions)
    .pipe(
      tap(_=>console.log(`deleted ${typeof(model)} /w id ${id}`)),
      catchError(this.handleError<DiscountInfo>(`delete${typeof(model)}`))
    );
  }

  update(id:number, model:DiscountSave):Observable<DiscountSave> {
    return this.http.put<DiscountSave>(`${this.config.apiUrl}/${this.resource}/update/${id}`,model,httpOptions)
    .pipe(
      tap(resPro=>console.log(`updated ${typeof(resPro)} ${resPro .id }`)),
      catchError(this.handleError<DiscountSave>(`update${typeof(model)}`))
    );
  }

  private handleError<T>(operation='operation',result?:T) {
    return (error:any):Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);     
    }
  }

}
