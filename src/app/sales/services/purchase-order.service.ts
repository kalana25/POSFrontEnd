import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api-service';
import { AppSettingsService } from '../../core/app-settings.service'; 
import { HttpClient } from '@angular/common/http';
import { PurchaseOrder } from '../models/purchase-order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends ApiService<PurchaseOrder> {

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) { 
    super(config.apiUrl,"PurchaseOrders",http);
  }

}
