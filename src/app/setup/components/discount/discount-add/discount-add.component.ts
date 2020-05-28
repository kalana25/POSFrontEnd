import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.css']
})
export class DiscountAddComponent implements OnInit {

  public discountForm:FormGroup;


  constructor(
    protected fb:FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.discountForm = this.fb.group({
      id:['',Validators.required ],
      itemName:['',Validators.required],
      itemId:['',Validators.required],
      rate:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required]
    });
  }

}
