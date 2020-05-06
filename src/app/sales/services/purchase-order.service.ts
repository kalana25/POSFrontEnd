import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api-service';
import { AppSettingsService } from '../../core/app-settings.service'; 
import { HttpClient } from '@angular/common/http';
import { PurchaseOrder } from '../models/purchase-order';
import { PurchaseOrderFullInfo } from '../models/purchase-order-fullinfo';
import { Observable } from 'rxjs'
import { catchError,tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends ApiService<PurchaseOrder> {

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) { 
    super(config.apiUrl,"PurchaseOrders",http);
  }

  getWithFullInfo(id:number):Observable<PurchaseOrderFullInfo> {
    return this.http.get<PurchaseOrderFullInfo>(`${this.url}/${this.resource}/fullinfo/find/${id}`)
    .pipe(
        tap(_=>console.log('fetched resource')),
        catchError(this.handleError<PurchaseOrderFullInfo>(`getWithFullInfo=${id}`))
    );
  }


}
