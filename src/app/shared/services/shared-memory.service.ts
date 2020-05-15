import { Injectable } from '@angular/core';
import { Key } from '../models/key';

@Injectable({
  providedIn: 'root'
})
export class SharedMemoryService {
  private token:string;
  private loggedUserEmail:string;
  private loggedUserId:string;

  constructor() { }

  //Token
  public getToken():string {
    if(this.token) {
      return this.token;
    }
    else {
      this.token =  localStorage.getItem(Key.Token.toString());
      return this.token;
    }
  }

  public setToken(value:string) {
    this.token = value;
    localStorage.setItem(Key.Token.toString(),value);
  }

  //Email
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

  //UserId
  public getLoggedUserId():string {
    if(this.loggedUserId) {
      return this.loggedUserId;
    }
    else {
      this.loggedUserId = localStorage.getItem(Key.LoggedUserId.toString());
      return this.loggedUserId;
    }
  }

  public setLoggedUserId(value:string) {
    this.loggedUserId = value;
    localStorage.setItem(Key.LoggedUserId.toString(),value);
  }
}
