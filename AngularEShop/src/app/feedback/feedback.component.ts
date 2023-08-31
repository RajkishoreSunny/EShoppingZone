import { Component } from '@angular/core';
import NavigationService from '../services/navigation.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedbackText: string = '';
  userId = +localStorage.getItem('userId')!;

  constructor(private navigationService: NavigationService, private authService: AuthService) {}

  submitFeedback(): void {
    if(this.authService.isLoggedIn()){
    if (this.feedbackText.trim() !== '') {
      this.navigationService.addFeedback(this.userId, this.feedbackText).subscribe(
        () => {
          alert('Feedback submitted successfully');
        },
        (error) => {
          console.log('Failed to submit feedback', error);
        }
      );
    }
    else{
      alert('Please login to give feedback!!');
    }
  }
}
}
