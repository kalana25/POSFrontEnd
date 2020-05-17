import { Component,OnInit } from '@angular/core';
import { SharedMemoryService } from '../../services/shared-memory.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public LoggedUser:string;

  constructor(
    public sharedMemoryService:SharedMemoryService
  ) {

  }

  ngOnInit() {
    this.LoggedUser=this.sharedMemoryService.getLoggedUserEmail();
  }

  alert(){

  }


}
