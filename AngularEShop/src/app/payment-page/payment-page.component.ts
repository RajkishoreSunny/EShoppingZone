import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import NavigationService from '../services/navigation.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private navigationService: NavigationService){}
  totalPrice: number = 0;
  isLoggedIn: boolean = false;
  orderDetails: any;
  orderData: any;
  totalItems: number = 0;
  userId: number = +localStorage.getItem('userId')!;
  userInfo: any = {};
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.route.queryParams.subscribe((params) => {
      const orderInfo = JSON.parse(params['orderInfo']);
      this.orderDetails = orderInfo.order;
      this.userInfo = orderInfo.userInfo;

      this.orderDetails.forEach((item: any) => {
        this.totalItems += item.quantity;
        this.totalPrice += item.totalPrice;
  });
});
}
  formData = {
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    nameOnCard: ''
};

minDate = new Date().toISOString().split('T')[0];

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

}
