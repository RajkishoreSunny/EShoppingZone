import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  loginForm: FormGroup;
  
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  
  get Email() { return this.loginForm.get('Email'); }
  get Password() { return this.loginForm.get('Password'); }
  
  onSubmit() {
    if (this.loginForm.invalid) {
      // Form is invalid, display error messages
      this.loginForm.markAllAsTouched();
      return;
    }
    
    const { Email, Password } = this.loginForm.value;
    
    this.authService.login(Email, Password).pipe(
      tap(
        () => {
          // Login successful
          alert('Authorized');
          this.router.navigate(['/protected']);
        },
        () => {
          // Login failed
          alert('You are not Authorized!!!');
          // Display error message to the user
        }
      )
    ).subscribe();
  }
}
