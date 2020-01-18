import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteStateService {

  history:Array<any> =[];

  constructor(
    private router:Router
  ) { }

  public loadRouting():void {
    this.router.events.pipe(filter(event=>event instanceof NavigationEnd))
    .subscribe(({urlAfterRedirects}:NavigationEnd)=>{
      console.log('NavigationEnd',urlAfterRedirects);
      console.log('History',this.history);
      this.history = [...this.history,urlAfterRedirects];
    })
  }

  public getHistory():Array<string> {
    return this.history;
  }

  public getPreviousUrl():string {
    return this.history[this.history.length-2] || '/index';
  }


}
