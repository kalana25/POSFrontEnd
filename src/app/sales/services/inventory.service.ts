import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettingsService } from 'src/app/core/app-settings.service';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { InventoryPagination } from '../models/inventory-pagination';
import { tap } from 'rxjs/operators';


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


}
