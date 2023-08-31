import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import NavigationService from '../services/navigation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginAuth: AuthService,private route:Router, private navigationService: NavigationService){}
  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl<any>('', [Validators.required, Validators.email]),
    password: new FormControl<any>('',
    [Validators.minLength(5),
    Validators.maxLength(20),
    Validators.required,
  ]),
});
isUserValid: boolean = false;
loginOnSubmit()
{
  this.loginAuth.loginUser([this.loginForm.value.email, this.loginForm.value.password]).subscribe(
    () => {
      this.isUserValid = true;
      alert('Login Successful!');
      this.route.navigate(['/suggested-products']);
    },
    (error) => {
        this.isUserValid = false;
        alert('Login Unsuccessful! Incorrect email or password.');

      console.error(error);
    }
  );
 }

get Email(): FormControl{
  return this.loginForm.get('email') as FormControl;
}
get Password(): FormControl{
  return this.loginForm.get('password') as FormControl;
}
isEmailValid(){
  return this.Email.valid && this.Email.dirty;
}
forgotPasswordClicked() {
  if (this.isEmailValid()) {
    const email = this.Email.value;
    this.sendEmail(email);
  } else {
    alert('Please enter a valid email before clicking "Forgot Password?"');
  }
}
sendEmail(email: string){
  this.navigationService.sendEmail(email).subscribe(
    res => {
      console.log(res);
      alert('Password reset link sent to your email Id.');
    }
    ,error => {
      console.log('Invalid User', error);
    }
  )
}
}

