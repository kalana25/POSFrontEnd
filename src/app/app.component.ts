import { Component } from '@angular/core';
import { ToolBarService } from './shared/services/toolbar.service';
import { RouteStateService } from './shared/services/route-state.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PosFrontend';
  
  constructor(
    public routeStateService:RouteStateService,
    public toolbarService:ToolBarService) {
      this.routeStateService.loadRouting();
  }
}
