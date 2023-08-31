import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import NavigationService from '../services/navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  isLoggedIn: boolean = false;
  orderDetails: any;
  orderData: any;
  totalItems: number = 0;
  totalPrice: number = 0;
  userId: number = +localStorage.getItem('userId')!;
  userInfo: any = {};

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.route.queryParams.subscribe((params) => {
      this.orderDetails = JSON.parse(params['orderDetails']);
      this.orderDetails.forEach((item: any) => {
        this.totalItems += item.quantity;
        this.totalPrice += item.totalPrice;
      });
    });
    this.getUserDetails();
  }
  getUserDetails(){
    this.navigationService.getUserInfo(this.userId).subscribe(
      response => {
        this.userInfo = response;
      }, error => {
        console.log(error);
      }
    );
  }
  constructor(private authService: AuthService, private route: ActivatedRoute, private navigationService: NavigationService, private router: Router) {}

  placeOrder(): void {
    if(this.authService.isLoggedIn()){
    this.orderDetails.forEach((item: any) => {
      this.orderData = {
        userId: localStorage.getItem('userId'),
        orderDetails: item
      };
      
    });
    this.moveToInvoice();
  }
}

moveToInvoice(): void {
  if (Array.isArray(this.orderDetails)) {
    const order = this.orderDetails.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity,
      totalPrice: item.totalPrice
    }));

    const userInfo = [{
      userName: this.userInfo.userName,
      email: this.userInfo.email,
      phoneNumber: this.userInfo.phoneNumber,
      address: this.userInfo.address
    }];

    this.router.navigate(['/orderdetails'], { queryParams: { userInfo: JSON.stringify(userInfo), order: JSON.stringify(order) } });
  } else {
    console.error('Invalid order data');
  }
}

moveToPayment(totalPrice: number) {
  if (Array.isArray(this.orderDetails) && this.userInfo.userName && this.userInfo.email && this.userInfo.phoneNumber && this.userInfo.address) {
    const order = this.orderDetails.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity,
      totalPrice: item.totalPrice
    }));

    const userInfo = {
      userName: this.userInfo.userName,
      email: this.userInfo.email,
      phoneNumber: this.userInfo.phoneNumber,
      address: this.userInfo.address
    };

    const orderInfo = {
      userInfo: userInfo,
      order: order
    };

    this.router.navigate(['/payment'], { queryParams: { totalPrice: totalPrice, orderInfo: JSON.stringify(orderInfo) } });
  } else {
    console.error('Invalid order data or user info');
  }
}





}
