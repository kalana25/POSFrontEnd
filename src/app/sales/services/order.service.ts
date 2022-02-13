import { Injectable } from '@angular/core';
import { AppSettingsService } from '../../core/app-settings.service'; 
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs'
import { catchError,tap } from 'rxjs/operators'

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private resource:string;

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) {
    this.resource = "Order";
  }

  public getNextCode():Observable<{code:string}> {
    return this.http.get<{code:string}> (`${this.config.apiUrl}/${this.resource}/find/next/code`)
    .pipe(
      tap(_=>console.log('fetched next code'))
    );
  }


}
