import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service';
import { AppSettingsService } from 'src/app/core/app-settings.service'; 
import { Supplier } from '../models/supplier';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends ApiService<Supplier> {

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) {
    super(config.apiUrl,"Suppliers",http);
  }

  getNextSupplierCode():Observable<any> {
    return this.http.get<any>(`${this.config.apiUrl}/${this.resource}/find/next/code`)
    .pipe(
        tap(_=>console.log('fetched next supplier code')),
        catchError(this.handleError<any>(`get=find/next/code`))
    );
  }
}
