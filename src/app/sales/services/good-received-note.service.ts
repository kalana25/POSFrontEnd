import { Injectable } from '@angular/core';
import { AppSettingsService } from '../../core/app-settings.service'; 
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs'
import { catchError,tap } from 'rxjs/operators'
import { PurchaseOrder } from '../models/purchase-order';
import { PurchaseOrderSave } from '../models/purchase-order-save';
import { PurchaseOrderFullInfo } from '../models/purchase-order-fullinfo';
import { RequestData } from 'src/app/core/request-data';
import { ResponseData } from 'src/app/core/response-Data';
import { GrnPagination } from '../models/grn-pagination';
import { GrnSave } from '../models/grn-save';
import { Grn } from '../models/grn';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GoodReceivedNoteService {
  private resource:string;

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) {
    this.resource = "GoodReceivedNotes";
  }

  pagination(requestData:RequestData):Observable<ResponseData<GrnPagination>> {
    const keys:Array<string> =[];
    Object.keys(requestData).forEach(element => {
        keys.push(`${element}=${requestData[element]}`);
    });
    let params = `?${keys.join('&')}`;
    return this.http.get<ResponseData<GrnPagination>>(`${this.config.apiUrl}/${this.resource}/pagination/${params}`)
    .pipe(
      tap(_=>console.log('fetched resources')),
    )
  }

  getNextCode():Observable<{code:string}> {
    return this.http.get<{code:string}> (`${this.config.apiUrl}/${this.resource}/find/next/code`)
    .pipe(
      tap(_=>console.log('fetched next code'))
    );
  }

  add(model:GrnSave):Observable<Grn> {
    return this.http.post<Grn>(`${this.config.apiUrl}/${this.resource}/save`,model,httpOptions)
    .pipe(
      tap((resPro:Grn) => console.log(`added ${typeof(resPro)} /w id${resPro.id }`)),
      catchError(this.handleError<Grn>(`add${typeof(model)}`))
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
