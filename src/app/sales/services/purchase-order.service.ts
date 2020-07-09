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
import { PurchaseOrderPagination } from '../models/purchase-order-pagination';
import { PurchaseOrderDetailFullItem } from '../models/purchase-order-detail-fullInfo';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  private resource:string;

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) {
    this.resource = "PurchaseOrders";
  }

  add(model:PurchaseOrderSave):Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(`${this.config.apiUrl}/${this.resource}/save`,model,httpOptions)
    .pipe(
      tap((resPro:PurchaseOrder) => console.log(`added ${typeof(resPro)} /w id${resPro.id }`)),
      catchError(this.handleError<PurchaseOrder>(`add${typeof(model)}`))
    );
  }

  delete(model:PurchaseOrder | number): Observable<PurchaseOrder> {
    const id = typeof model === 'number' ? model: model.id;
    return this.http.delete<PurchaseOrder>(`${this.config.apiUrl}/${this.resource}/delete/${id}`,httpOptions)
    .pipe(
      tap(_=>console.log(`deleted ${typeof(model)} /w id ${id}`)),
      catchError(this.handleError<PurchaseOrder>(`delete${typeof(model)}`))
    );
  }

  update(id:number, model:PurchaseOrderSave):Observable<PurchaseOrder> {
    return this.http.put<PurchaseOrder>(`${this.config.apiUrl}/${this.resource}/update/${id}`,model,httpOptions)
    .pipe(
      tap(resPro=>console.log(`updated ${typeof(resPro)} ${resPro .id }`)),
      catchError(this.handleError<PurchaseOrder>(`update${typeof(model)}`))
    );
  }

  getWithFullInfo(id:number):Observable<PurchaseOrderFullInfo> {
    return this.http.get<PurchaseOrderFullInfo>(`${this.config.apiUrl}/${this.resource}/fullinfo/find/${id}`)
    .pipe(
        tap(_=>console.log('fetched resource')),
        catchError(this.handleError<PurchaseOrderFullInfo>(`getWithFullInfo=${id}`))
    );
  }

  getDetailsWithFullInfo(purchaseOrderId:number):Observable<Array<PurchaseOrderDetailFullItem>> {
    return this.http.get<Array<PurchaseOrderDetailFullItem>> (`${this.config.apiUrl}/${this.resource}/detail/find/${purchaseOrderId}`)
    .pipe(
      tap(_=>console.log('fetched po details')),
      catchError(this.handleError<Array<PurchaseOrderDetailFullItem>>(`getDetailsWithFullInfo=${purchaseOrderId}`))
      );
  } 

  pagination(requestData:RequestData):Observable<ResponseData<PurchaseOrderPagination>>{
    return this.http.post<ResponseData<PurchaseOrderPagination>>(`${this.config.apiUrl}/${this.resource}/pagination`,requestData)
    .pipe(
        tap(_=>console.log('fetched resources')),
        //catchError(this.handlePaginationError('get paginated resources',ResponseData<T>))
    )
  }

  private handleError<T>(operation='operation',result?:T) {
    return (error:any):Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);     
    }
  }


}
