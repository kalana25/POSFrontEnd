import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpEvent,HttpHandler,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Key } from '../models/key';
import { SharedMemoryService } from './shared-memory.service';

@Injectable()
export class RequestIntercepterService implements HttpInterceptor {

  constructor(
    public sharedMemoryService:SharedMemoryService
  ) { }

  intercept(req :HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>> {

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.sharedMemoryService.getToken()}`)
    });
    return next.handle(authReq);
  }
}
