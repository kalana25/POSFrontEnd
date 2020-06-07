import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service';
import { Product } from '../models/product';
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { AppSettingsService } from 'src/app/core/app-settings.service'; 
import { HttpClient } from '@angular/common/http';
import { RequestData } from 'src/app/core/request-data';
import { ResponseData } from 'src/app/core/response-data';
import { MeasurementInfo } from '../models/measurement-info';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  private resource:string;

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) {
    this.resource = "Units/purchase";
  }

  pagination(requestData:RequestData):Observable<ResponseData<MeasurementInfo>>{
    const keys:Array<string> =[];
    Object.keys(requestData).forEach(element => {
        keys.push(`${element}=${requestData[element]}`);
    });
    let params = `?${keys.join('&')}`;
    return this.http.get<ResponseData<MeasurementInfo>>(`${this.config.apiUrl}/${this.resource}/pagination/${params}`)
    .pipe(
        tap(_=>console.log('fetched resources')),
        //catchError(this.handlePaginationError('get paginated resources',ResponseData<T>))
    )
  }


}
