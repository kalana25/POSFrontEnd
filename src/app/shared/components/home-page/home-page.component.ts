import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '../../services/route-state.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    public routeStateService:RouteStateService) {
      this.routeStateService.loadRouting();
  }

  ngOnInit() {
  }

}
