import { Component } from '@angular/core';
import { RouteStateService } from './shared/services/route-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    public routeStateService:RouteStateService) {
      this.routeStateService.loadRouting();
  }
}
