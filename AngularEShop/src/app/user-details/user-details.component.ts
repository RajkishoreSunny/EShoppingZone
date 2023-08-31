import { Component, Input, OnInit } from '@angular/core';
import NavigationService from '../services/navigation.service';
import { UserDetails } from '../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.getUserDetails();
  }
  Details: UserDetails | null = null;
  editMode = false;
  loginInfo: Array<string> = ['', ''];
  isUserValid: boolean = false;
  profileImg!: File;
  userId: number = Number(localStorage.getItem('userId'));
  constructor(private navigationService: NavigationService,
     private formBuilder: FormBuilder,
     private authService: AuthService,
     private datePipe: DatePipe
     ){
    this.initializeForm();
  }
  getUserDetails(){
    const id = Number(localStorage.getItem('userId'));
    if(id != null){
      this.navigationService.getUserInfo(id).subscribe(
        (res: any) => {
          this.Details = res;
        }
        ,
        error => {
          console.log(error);
        }
      );
    }
    else{
      alert('User not found');
    }
  }
  getDefaultProfileImage(gender: string | undefined): string {
    const lowerCaseGender = (gender || '').toLowerCase();
    if(lowerCaseGender === 'f' || lowerCaseGender === 'female'){
      return 'assets/female.jpg';
    }
    else{
      return 'assets/male.jpg';
    }
  }
  getImagePath(imageName: string | undefined): string {
    if (imageName) {
      const base64Image = imageName;
      return `data:image/png;base64,${base64Image}`;
    } else {
      return '';
    }
  }

  @Input() userDetails: UserDetails | null = null;
  userDetailsForm!: FormGroup;


  initializeForm() {
    this.userDetailsForm = this.formBuilder.group({
      userName: [this.userDetails?.userName || '', Validators.required],
      email: [this.userDetails?.email || '', [Validators.required, Validators.email]],
      address: [this.userDetails?.address || '', [Validators.required]],
      dateOfBirth: [this.userDetails?.dateOfBirth || '', [Validators.required]],
      phoneNumber: [this.userDetails?.phoneNumber || '', [Validators.required]],
      gender: [this.userDetails?.gender || '', [Validators.required]],
      password: ['', [Validators.required]] 
    });
  }

  onSubmit() {
    if (this.userDetailsForm.valid) {
      console.log(this.userDetailsForm.value);
      const email = this.userDetailsForm.get('email')?.value;
      const password = this.userDetailsForm.get('password')?.value;
      this.loginInfo = [email, password];
  
      this.authService.loginUser(this.loginInfo).subscribe(
        () => {
          this.isUserValid = true;
          {
            const userId = Number(localStorage.getItem('userId'));
            this.navigationService.updateUser(userId, this.userDetailsForm.getRawValue()).subscribe(
              () => {
                alert('Details Updated!');
                this.editMode = false;
              },
              (error) => {
                alert('An error occurred while updating user details. Maybe the password was incorrect!');
                console.log(error);
              }
            );
          }
        },
        (error) => {
          console.error('Error logging in:', error);
          alert('An error occurred while logging in.');
        }
      );
    }
  }
  onFileSelected(event:any){
    this.profileImg = event.target.files[0];
  }
  uploadImage(){
    if(this.authService.isLoggedIn() && this.profileImg){
    this.navigationService.uploadUserImg(this.profileImg, this.userId).subscribe(
      response => {
        console.log(response);
        alert('Uploaded');
      }
      , error => {
        console.log('Could not Upload', error);
      }
    )
    }
  }
  onEditButtonClick() {
    this.editMode = true;
  }
  get userName() {
    return this.userDetailsForm.get('userName');
  }

  get email() {
    return this.userDetailsForm.get('email');
  }

  get address(){
    return this.userDetailsForm.get('address');
  }

  get dateOfBirth(){
    return this.userDetailsForm.get('dateOfBirth');
  }

  get phoneNumber(){
    return this.userDetailsForm.get('phoneNumber');
  }

  get gender(){
    return this.userDetailsForm.get('gender');
  }

  get password(){
    return this.userDetailsForm.get('password');
  }
}
