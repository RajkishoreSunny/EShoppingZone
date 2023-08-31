import { Component } from '@angular/core';
import NavigationService from '../services/navigation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    reenterPassword: ['', Validators.required]
  });
  passwordMismatch: boolean = false;

  constructor(private formBuilder: FormBuilder, private navigationService: NavigationService) {}

  onChangePasswordSubmit() {
    const email = this.changePasswordForm.value.email;
    const reenterPassword = this.changePasswordForm.value.reenterPassword;
    if (this.changePasswordForm.valid && this.changePasswordForm.value.password === reenterPassword) {
      this.navigationService.changePassword(email, reenterPassword).subscribe(
        () => {
          alert('Changed');
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
}
