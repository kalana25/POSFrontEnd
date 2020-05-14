import { Injectable } from '@angular/core';
import { AppSettingsService } from 'src/app/core/app-settings.service';
import { Observable,pipe } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { UserManagerResponse } from '../models/user-manager-response';
import { HttpClient,HttpHeaders } from '@angular/common/http';

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

  public register(model:Register):Observable<UserManagerResponse> {
    const url:string =`${this.config.apiUrl}/Auth/register`;
    return this.http.post<UserManagerResponse>(url,model,httpOptions)
    .pipe(
      tap((resPro:UserManagerResponse)=>console.log(`a new user has registered with ${model.email}`))
    );
  }


}
