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


}
