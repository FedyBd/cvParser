import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from "../services/api.service";
import {User} from "../models/user.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private readonly apiservice: ApiService,
              private toastr: ToastrService) {}

  userTypes = [
    { label: 'Recruiter', value: 'recruiter' },
    { label: 'Candidate', value: 'candidate' }
  ];

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      type: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user : User ={
        username: this.registerForm.controls['username']?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        usertype: this.registerForm.get('type')?.value,}
      // Handle form submission (e.g., send data to the server)
      this.apiservice.registerUser(user).subscribe(
        (response: Response) => {
          // Display a success toast, with a title
          this.toastr.success('Registered Successfully', 'Success!',{
            closeButton:true,
            timeOut:3000,
            progressBar: true,
          });
          this.registerForm.reset();

        },error => {
          this.toastr.error('User not Registered', 'Error!');
        }
      )

    } else {

    }
  }
}
