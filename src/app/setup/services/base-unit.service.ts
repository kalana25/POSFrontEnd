import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service';
import { AppSettingsService } from 'src/app/core/app-settings.service'; 
import { BaseUnit } from '../models/base-unit';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseUnitService extends ApiService<BaseUnit> {

  constructor(
    protected http:HttpClient,
    protected config:AppSettingsService
  ) {
    super(config.apiUrl,"Units/base",http);
  }
}
