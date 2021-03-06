import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service';
import { AppSettingsService } from 'src/app/core/app-settings.service'; 
import { Supplier } from '../models/supplier';
import { HttpClient } from '@angular/common/http';

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
}
