import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bs-action-menu',
  templateUrl: './bs-action-menu.component.html',
  styleUrls: ['./bs-action-menu.component.css']
})
export class BsActionMenuComponent implements OnInit {

  constructor(
    private bottomSheetRef:MatBottomSheetRef<BsActionMenuComponent>
  ) { }

  ngOnInit() {
  }

  OnAddCategory() {
    this.bottomSheetRef.dismiss();
    this.bottomSheetRef.afterDismissed().subscribe(res=>{
      console.log("route to category");
      
    })
  }

  OnAddProduct() {
    this.bottomSheetRef.dismiss();
    this.bottomSheetRef.afterDismissed().subscribe(res=>{
      console.log("route to product");
    })
  }

}
