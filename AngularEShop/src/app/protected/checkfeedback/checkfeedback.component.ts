import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/models';
import  NavigationService  from 'src/app/services/navigation.service';

@Component({
  selector: 'app-checkfeedback',
  templateUrl: './checkfeedback.component.html',
  styleUrls: ['./checkfeedback.component.css']
})
export class CheckfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  userId = +localStorage.getItem('userId')!;
  userInfoMap: Map<number, any> = new Map<number, any>();

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  getAllFeedbacks() {
    this.navigationService.getFeedbacks().subscribe(
      (res: any) => {
        this.feedbacks = res;
        this.extractUserIds();
      },
      (error) => {
        console.log(error, 'Something went wrong');
      }
    );
  }

  extractUserIds() {
    const userIds = Array.from(new Set(this.feedbacks.map((feedback) => feedback.userId)));
    this.getUserInfoForUserIds(userIds);
  }

  getUserInfoForUserIds(userIds: number[]) {
    userIds.forEach((userId) => {
      this.navigationService.getUserInfo(userId).subscribe(
        (res) => {
          this.userInfoMap.set(userId, res);
        },
        (error) => {
          console.log('Error fetching user info for userId ' + userId + ':', error);
        }
      );
    });
  }

  getUserInfo(userId: number) {
    const userInfo = this.userInfoMap.get(userId);
    if (userInfo) {
      return userInfo.userName;
    } else {
      return 'Loading...';
    }
  }
}
