import { Component,OnInit } from '@angular/core';
import { CartItem, Product } from '../models/models';
import NavigationService from '../services/navigation.service';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrls: ['./suggested-products.component.css']
})
export class SuggestedProductsComponent implements OnInit {
  products: Product[] = [];
  isAddedToCart: boolean = false;
  maxProductsToShow: number = 6;
  ngOnInit(): void {
  }
  getImagePath(imageName: string): string {
    if (imageName) {
      const base64Image = imageName;
      return `data:image/png;base64,${base64Image}`;
    } else {
      return '';
    }
  }
  constructor(private navigationService: NavigationService,
    private authService: AuthService, private router: Router
    ) {
      this.navigationService.getProducts(
        ).subscribe((response: any[]) =>
        {
          for(let product of response){
            this.products.push(product);
          }
          this.navigationService.setProduct(response);
        }
        )
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
  
          const existingItem = cartItems.find((item: CartItem) => item.productId === pId);
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
      this.router.navigate(['/login']);
    }
  }
 
}
