import { Component,OnInit } from '@angular/core';
import NavigationService from '../services/navigation.service';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { CartItem } from '../models/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      console.log(this.authService.isLoggedIn())
      alert("Login to access Cart");
      this.route.navigate(['/login']);
    }
    else{
      this.userId = Number(localStorage.getItem('userId'));
      this.getAllItems();
    }
  }
  private userId: number = 0;
  cartItems: CartItem[] = [];
  productDetails: Array<any> = [];

  constructor(private navigationService: NavigationService,
     private authService: AuthService,
     private route: Router){
      this.userId = Number(localStorage.getItem('userId'));
     }
    getAllItems(){
      this.navigationService.getItemsFromCart(this.userId).subscribe(
        response => {
          this.cartItems = response;
          this.loadProductDetails();
        },
        error => {
          console.log(error);
        }
      )
    }
    loadProductDetails(){
      for(const item of this.cartItems){
        this.navigationService.getProductById(item.productId).subscribe(
          (response) => {
            this.productDetails.push(response);
          },
          (error) => {
            console.log('Error fetching product details:', error);
          }
        );
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
    getProductById(productId: number): any{
      return this.productDetails.find((product) => Number(product.productId) === productId);
    }
     decreaseQuantity(item: CartItem): void {
      if (item.quantity > 1) {
        item.quantity--;
        this.navigationService.QuantityInCart(item.productId, this.userId, item.quantity).subscribe(
          () => {
            console.log('Quantity is updated');
          },
          (error) => {
            console.log('Quantity not updated!', error);
          }
      )
      }
    }
  
    increaseQuantity(item: CartItem): void {
      item.quantity++;
      this.navigationService.QuantityInCart(item.productId, this.userId, item.quantity).subscribe(
          () => {
            console.log('Quantity is updated');
          },
          (error) => {
            console.log('Quantity not updated!', error);
          }
      )
    }
  
    calculateTotalItems(): number {
      let totalItems = 0;
      for (const item of this.cartItems) {
        totalItems += item.quantity;
      }
      return totalItems;
    }
  
    calculateTotalPrice(): number {
      let totalPrice = 0;
      for (const item of this.cartItems) {
        const product = this.getProductById(item.productId);
        if (product && product.productPrice) {
          totalPrice += item.quantity * product.productPrice;
        }
      }
      return totalPrice;
    }
  
    removeFromCart(item: CartItem): void {
      const index = this.cartItems.indexOf(item);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
      this.navigationService.deleteItemFromCart(item).subscribe(
        res => {
          alert('Deleted');
        },
        error=> {
          console.log(error);
        }
      )
    }
    moveToOrder() {
      const orderDetails = this.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        totalPrice: item.totalPrice
      }));
    
      this.route.navigate(['/order'], { queryParams: { userId: localStorage.getItem('userId'), orderDetails: JSON.stringify(orderDetails) } });
    }
    
}
