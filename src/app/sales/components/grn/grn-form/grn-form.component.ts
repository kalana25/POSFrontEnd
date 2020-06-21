import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-grn-form',
  templateUrl: './grn-form.component.html',
  styleUrls: ['./grn-form.component.css']
})
export class GrnFormComponent implements OnInit {

  grnForm:FormGroup;

  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.grnForm = this.fb.group({
      code:['',Validators.required],
      grnDate:['',Validators.required],
      comment:[''],
      purchaseOrderId:['',Validators.required]
    });
  }

}
