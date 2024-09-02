import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from "../services/api.service";
import {User} from "../models/user.model";
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";
import {Emitters} from "../Emitters/emitters";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "./authservice";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private readonly apiservice: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private authservice: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(){
    if (this.loginForm.valid) {
      const user_credentials ={
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      }
      // Handle form submission (e.g., send data to the server)
      this.apiservice.login(user_credentials).subscribe(
        (response: any) => {
          console.log(response)
          // Assuming response contains the user's type
          localStorage.setItem('userType', response.userType);
          localStorage.setItem('authenticated', 'true');
          // Display a success toast, with a title
          this.toastr.success('Logging in', 'Success!',{
            closeButton:true,
            timeOut:3000,
            progressBar: true,
          });
          this.loginForm.reset();
          this.authservice.loginSuccess(); // Emit `true` after successful login
          Emitters.authEmitter.emit(true);
          this.router.navigateByUrl('offers');

        },(err: any) => {
          this.toastr.error('Failed to Log in', 'Error!');
        }
      )

    } else {}
  }
}
