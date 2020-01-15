import { Injectable } from '@angular/core';
import { ApiService } from '../core/api-service';
import { AppSettingsService } from '../core/app-settings.service'; 
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';

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

  
}
