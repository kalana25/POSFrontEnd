import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api-service'
import { Login } from '../models/login';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AppSettingsService } from 'src/app/core/app-settings.service';
import { Observable,pipe } from 'rxjs';
import { UserManagerResponse } from '../models/user-manager-response';
import { tap,catchError } from 'rxjs/operators';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    protected http:HttpClient,
    private config:AppSettingsService
  ) { 

  }

  public login(model:Login):Observable<UserManagerResponse> {
    const url:string =`${this.config.apiUrl}/Auth/login`;
    return this.http.post<UserManagerResponse>(url,model,httpOptions)
    .pipe(
      tap((resPro:UserManagerResponse)=>console.log(`user has login with ${model.email}`))
    );
  }

  


}
