import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bs-action-menu',
  templateUrl: './bs-action-menu.component.html',
  styleUrls: ['./bs-action-menu.component.css']
})
export class BsActionMenuComponent implements OnInit {

  constructor(
    private router:Router,
    private bottomSheetRef:MatBottomSheetRef<BsActionMenuComponent>
  ) { }

  ngOnInit() {
  }

  OnAddCategory() {
    this.bottomSheetRef.dismiss();
    this.bottomSheetRef.afterDismissed().subscribe(res=>{
      this.router.navigate(['/category-new']);
    })
  }

  OnAddProduct() {
    this.bottomSheetRef.dismiss();
    this.bottomSheetRef.afterDismissed().subscribe(res=>{
      this.router.navigate(['/product-new']);
    })
  }

}
