import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Register } from '../../models/register';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(
    public fb:FormBuilder,
    public router:Router,
    public authService:AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private OnSubmit() {
    if(this.registerForm.valid) {
      const model:Register = this.registerForm.value;
      this.authService.register(model)
      .subscribe(res=>{
        if(res.isSuccess) {
          this.router.navigate(['/login-user']);
        }
      },err=>{
        console.error(err);
      })
    }
  }

  private initForm() {
    this.registerForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',[
        Validators.required,
        this.confirmPasswordValidation()
      ]]
    });
  }

  private confirmPasswordValidation(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        if(!this.registerForm || !this.registerForm.get('password').value)
          return null;
        if(this.registerForm.get('password').value === control.value)
          return null;
        return {'notEqual': {value: control.value}};
    };
  }

  public SignIn() {
    this.router.navigate(['/login-user']);
  }

}
