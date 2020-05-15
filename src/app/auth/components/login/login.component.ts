import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators'
import { UserManagerResponse } from '../../models/user-manager-response';
import { Key } from '../../../shared/models/key';
import { Router } from '@angular/router';
import { SharedMemoryService } from 'src/app/shared/services/shared-memory.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    public fb:FormBuilder,
    public router:Router,
    public sharedMemoryService:SharedMemoryService,
    public authService:AuthService) { 

    }

  ngOnInit() {
    this.initFrom();
  }

  private initFrom() {
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  public OnSubmit() {
    if(this.loginForm.valid) {
      const model:Login = this.loginForm.value;
      this.authService.login(model)
      .subscribe(res=>{
        if(res.isSuccess) {
          this.sharedMemoryService.setToken(res.message);
          this.sharedMemoryService.setLoggedUserEmail(model.email);
          this.router.navigate(['/home-page']);
        }
      },err=>{
        console.error(err);
      })
    }
  }

  public SignUp() {
    this.router.navigate(['/register-user']);
  }

}
