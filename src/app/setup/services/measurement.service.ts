import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service';
import { Product } from '../models/product';
import { Observable,of } from 'rxjs'
import { tap,catchError } from 'rxjs/operators'
import { AppSettingsService } from 'src/app/core/app-settings.service'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestData } from 'src/app/core/request-data';
import { ResponseData } from 'src/app/core/response-data';
import { MeasurementInfo } from '../models/measurement-info';
import { MeasurementSave } from '../models/measurement-save';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

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

  pagination(requestData:RequestData):Observable<ResponseData<MeasurementInfo>> {
    const keys:Array<string> =[];
    Object.keys(requestData).forEach(element => {
        keys.push(`${element}=${requestData[element]}`);
    });
    let params = `?${keys.join('&')}`;
    return this.http.get<ResponseData<MeasurementInfo>>(`${this.config.apiUrl}/${this.resource}/pagination/${params}`)
    .pipe(
        tap(_=>console.log('fetched resources')),
    )
  }

  add(model:MeasurementSave):Observable<MeasurementSave> {
    return this.http.post<MeasurementSave>(`${this.config.apiUrl}/${this.resource}/save`,model,httpOptions)
    .pipe(
      tap((resPro:MeasurementSave) => console.log(`added ${typeof(resPro)} /w id${resPro.id }`)),
      catchError(this.handleError<MeasurementSave>(`add${typeof(model)}`))
    );
  }

  delete(model:MeasurementInfo | number): Observable<MeasurementInfo> {
    const id = typeof model === 'number' ? model: model.id;
    return this.http.delete<MeasurementInfo>(`${this.config.apiUrl}/${this.resource}/delete/${id}`,httpOptions)
    .pipe(
      tap(_=>console.log(`deleted ${typeof(model)} /w id ${id}`)),
      catchError(this.handleError<MeasurementInfo>(`delete${typeof(model)}`))
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
