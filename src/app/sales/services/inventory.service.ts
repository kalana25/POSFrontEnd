import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettingsService } from 'src/app/core/app-settings.service';
import { Observable,of } from 'rxjs';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { InventoryPagination } from '../models/inventory-pagination';
import { tap,catchError } from 'rxjs/operators';
import { InventoryFullInfo } from '../models/inventory-fullInfo';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private resource:string;

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) {
    this.resource = "Inventories";
  }

  pagination(requestData:RequestData):Observable<ResponseData<InventoryPagination>> {
    const keys:Array<string> =[];
    Object.keys(requestData).forEach(element => {
        keys.push(`${element}=${requestData[element]}`);
    });
    let params = `?${keys.join('&')}`;
    return this.http.get<ResponseData<InventoryPagination>>(`${this.config.apiUrl}/${this.resource}/pagination/${params}`)
    .pipe(
      tap(_=>console.log('fetched resources')),
    )
  }

  getWithFullInfo(itemId:number):Observable<InventoryFullInfo> {
    return this.http.get<InventoryFullInfo>(`${this.config.apiUrl}/${this.resource}/fullinfo/find/ItemId/${itemId}`)
    .pipe(
        tap(_=>console.log('fetched resource')),
        catchError(this.handleError<InventoryFullInfo>(`getWithFullInfo=${itemId}`))
    );
  }

  getAvailableStockByCategory(categoryId:number):Observable<Array<any>> {
    return this.http.get<any>(`${this.config.apiUrl}/${this.resource}/availableStock/find/CategoryId/${categoryId}`)
    .pipe(
        tap(_=>console.log('fetch availableStock by categoryId')),
        catchError(this.handleError<any>(`get=availableStock/find/CategoryId`))
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
