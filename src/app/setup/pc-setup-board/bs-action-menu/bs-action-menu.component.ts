import { Component, OnInit,Inject } from '@angular/core';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bs-action-menu',
  templateUrl: './bs-action-menu.component.html',
  styleUrls: ['./bs-action-menu.component.css']
})
export class BsActionMenuComponent implements OnInit {

  constructor(
    private router:Router,
    private bottomSheetRef:MatBottomSheetRef<BsActionMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
    localStorage.setItem('ABC',JSON.stringify(this.data));
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
      this.router.navigate(['/product-new'],{state : { source: "From-PC-Setup"}});
    })
  }

}
