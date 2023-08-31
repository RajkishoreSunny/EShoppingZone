import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import NavigationService from '../services/navigation.service';
import { WishListItem } from '../models/models';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  private userId: number = 0;
  wishListItems: WishListItem[] = [];
  productDetails: Array<any> = [];
  isAddedToCart: boolean = false;
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      alert('Login to access WishList');
      this.route.navigate(['/login']);
    }
    else{
      this.userId = Number(localStorage.getItem('userId'));
      this.getAllItems();
    }
  }
  constructor(private authService: AuthService, private route: Router, private navigationService: NavigationService){
    this.userId = Number(localStorage.getItem('userId'));
  }
  addToCart(productId: number, productPrice: number) {
    if (this.authService.isLoggedIn()) {
      const userId = Number(localStorage.getItem('userId'));
      const pId = productId;
      const quantity = 1;
      const totalPrice = productPrice;
  
      this.navigationService.getItemsFromCart(userId).subscribe(
        (response) => {
          const cartItems = response;
  
          const existingItem = cartItems.find((item: WishListItem) => item.productId === pId);
          if (existingItem) {
            this.navigationService
              .QuantityInCart(pId, userId, existingItem.quantity + 1)
              .subscribe(
                () => {
                  console.log('Quantity is updated');
                  this.isAddedToCart = true;
                },
                (error) => {
                  console.error('Failed to update quantity:', error);
                }
              );
          } else {
            // Product does not exist in the cart, add a new item
            this.navigationService
              .addToCartTable(userId, pId, quantity, totalPrice)
              .subscribe(
                (response) => {
                  console.log('Item added to cart:', response);
                  alert('Added Successfully');
                  this.isAddedToCart = true;
                },
                (error) => {
                  console.error('Failed to add item to cart:', error);
                }
              );
          }
        },
        (error) => {
          console.error('Failed to retrieve cart items:', error);
        }
      );
    } else {
      alert('Please Login!');
      this.route.navigate(['/login']);
    }
  }
  getAllItems(){
    this.navigationService.WishListItems(this.userId).subscribe(
      (response: any) => {
        this.wishListItems = response;
        this.loadProductDetails();
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }
  getProductById(productId: number): any{
    return this.productDetails.find((product) => Number(product.productId) === productId);
  }
  loadProductDetails(){
    for(const item of this.wishListItems){
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
  removeFromWishList(item: WishListItem): void {
    const index = this.wishListItems.indexOf(item);
    if (index !== -1) {
      this.wishListItems.splice(index, 1);
    }
    this.navigationService.removeFromWishList(item).subscribe(
      res => {
        alert('Removed');
      },
      error=> {
        console.log(error);
      }
    )
  }
}
