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
  loading:boolean=false;
  ResponseError:string;

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
      this.loading=true;
      const model:Login = this.loginForm.value;
      this.authService.login(model)
      .subscribe(res=>{
        if(res.isSuccess) {
          this.loading=false;
          this.sharedMemoryService.setToken(res.message);
          this.sharedMemoryService.setLoggedUserEmail(model.email);
          this.sharedMemoryService.setLoggedUserId(res.loggedUser.id);
          this.router.navigate(['/home-page']);
        } else {
          this.loading = false;
          this.ResponseError = res.message;
        }
      },err=>{
        this.loading = false;
        console.error(err);
      })
    }
  }

  public SignUp() {
    this.router.navigate(['/register-user']);
  }

}
