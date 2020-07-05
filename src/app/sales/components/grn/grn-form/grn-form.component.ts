import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoodReceivedNoteService } from 'src/app/sales/services/good-received-note.service';
import { PurchaseOrderPagination } from 'src/app/sales/models/purchase-order-pagination';

@Component({
  selector: 'app-grn-form',
  templateUrl: './grn-form.component.html',
  styleUrls: ['./grn-form.component.css']
})
export class GrnFormComponent implements OnInit {

  grnForm:FormGroup;
  @Output() public formSubmit = new EventEmitter<FormGroup>();

  constructor(
    private fb:FormBuilder,
    private grnService:GoodReceivedNoteService
  ) { }

  ngOnInit() {
    this.initForm();
    this.grnService.getNextCode()
    .subscribe(res=>{
      if(res){
        this.grnForm.get('code').patchValue(res.code);
      }
    },err=>{
      console.error(err);
    })
  }

  initForm() {
    this.grnForm = this.fb.group({
      code:['',Validators.required],
      grnDate:[new Date(),Validators.required],
      comment:[''],
      purchaseOrderCode:['',Validators.required],
      purchaseOrderId:['',Validators.required]
    });
  }

  public OnPoSelect(model:PurchaseOrderPagination) {
    this.grnForm.get('purchaseOrderId').patchValue(model.id);
    this.grnForm.get('purchaseOrderCode').patchValue(model.code);
  }

  public OnSubmit() {
    this.formSubmit.emit(this.grnForm);
  }

}
