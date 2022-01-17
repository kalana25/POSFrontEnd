import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service';
import { AppSettingsService } from 'src/app/core/app-settings.service'; 
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService<Category>{

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) { 
    super(config.apiUrl,"ItemCategories",http);
  }

  getNextCategoryCode():Observable<any> {
    return this.http.get<any>(`${this.config.apiUrl}/${this.resource}/find/next/code`)
    .pipe(
        tap(_=>console.log('fetched next category code')),
        catchError(this.handleError<any>(`get=find/next/code`))
    );
  }

  
}
