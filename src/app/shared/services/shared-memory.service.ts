import { Injectable } from '@angular/core';
import { Key } from '../models/key';

@Injectable({
  providedIn: 'root'
})
export class SharedMemoryService {
  private token:string;
  private loggedUserEmail:string;

  constructor() { }

  public getToken():string {
    if(this.token) {
      console.log("from service");
      return this.token;
    }
    else {
      console.log("from local storage");
      this.token =  localStorage.getItem(Key.Token.toString());
      return this.token;
    }
  }

  public setToken(value:string) {
    this.token = value;
    localStorage.setItem(Key.Token.toString(),value);
  }

  public getLoggedUserEmail():string {
    if(this.loggedUserEmail) {
      return this.loggedUserEmail;
    }
    else {
      this.loggedUserEmail = localStorage.getItem(Key.LoggedUserEmail.toString());
      return this.loggedUserEmail;
    }
  }

  public setLoggedUserEmail(value:string) {
    this.loggedUserEmail = value;
    localStorage.setItem(Key.LoggedUserEmail.toString(),value);
  }
}
