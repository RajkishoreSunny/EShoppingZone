import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  repeatPass: string = "none";
  displayMsg: string = "";
  isAccountCreated: boolean = false;
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void {
  }
    registerForm = new FormGroup({
      UserName: new FormControl<any>("", [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]),
    Password: new FormControl<any>("", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    rpwd: new FormControl<any>(""),
    Email: new FormControl<any>("", [Validators.required, Validators.email]),
    DateOfBirth: new FormControl<any>("", [Validators.required]),
    PhoneNumber: new FormControl<any>("", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]*")]),
    Gender: new FormControl<any>("", [Validators.required]),
    Address: new FormControl<any>("", [Validators.required])
  });
  registerSubmitted() {
    if (this.Password.value === this.rpwd.value) {
        this.repeatPass = 'none';

        const userData = [
          this.registerForm.value.UserName,
          this.registerForm.value.Password,
          this.registerForm.value.Email,
          this.registerForm.value.DateOfBirth,
          this.registerForm.value.PhoneNumber,
          this.registerForm.value.Gender,
          this.registerForm.value.Address
        ];
        this.authService.registerUser(userData).subscribe(
            (res) => {
                if (res) {
                    alert("Account Created!");
                    this.router.navigate(['/login']);
                }
            },
            (error) => {
                console.error("Error creating user:", error);
            }
        );
    } else {
        this.repeatPass = 'inline';
    }
}



  get UserName(): FormControl{
    return this.registerForm.get("UserName") as FormControl;
  }
  get Password(): FormControl{
    return this.registerForm.get("Password") as FormControl;
  }
  get rpwd(): FormControl{
    return this.registerForm.get("rpwd") as FormControl;
  }
  get Email(): FormControl{
    return this.registerForm.get("Email") as FormControl;
  }
  get DateOfBirth(): FormControl{
    return this.registerForm.get("DateOfBirth") as FormControl;
  }
  get PhoneNumber(): FormControl{
    return this.registerForm.get("PhoneNumber") as FormControl;
  }
  get Gender(): FormControl{
    return this.registerForm.get("Gender") as FormControl;
  }
  get Address(): FormControl{
    return this.registerForm.get("Address") as FormControl;
  }
}
