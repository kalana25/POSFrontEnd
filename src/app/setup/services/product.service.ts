import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service';
import { Product } from '../models/product';
import { AppSettingsService } from 'src/app/core/app-settings.service'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService<Product>{

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) { 
    super(config.apiUrl,"Items",http);
  }

  getNextProductCode():Observable<any> {
    return this.http.get<any>(`${this.config.apiUrl}/${this.resource}/find/next/code`)
    .pipe(
        tap(_=>console.log('fetched next product code')),
        catchError(this.handleError<any>(`get=find/next/code`))
    );
  }
}
