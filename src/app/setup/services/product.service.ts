import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service';
import { Product } from '../models/product';
import { AppSettingsService } from 'src/app/core/app-settings.service'; 
import { HttpClient } from '@angular/common/http';

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
}
