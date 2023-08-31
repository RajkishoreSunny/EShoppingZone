
import { Component, Input, OnInit } from '@angular/core';
import NavigationService from '../services/navigation.service';
import { CartItem, Product } from '../models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() view: 'grid' | 'list' | 'currcartitem' = 'list';
  products: Product[] = []; 
  selectedProduct: Product | null = null;
  categoryId: number|null = null;
  isAddedToCart: boolean = false;
  constructor(private navigationService: NavigationService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { 
    
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params=>
      {
        const categoryIdParam = params.get('categoryId');
        if (categoryIdParam) {
          this.categoryId = Number(categoryIdParam);
          this.loadProductsOnCategory(this.categoryId);
        }
      })
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
  loadProductsOnCategory(categoryId: number): void{
    this.navigationService.getCategoryList(categoryId).subscribe(
      {
        next: (response) => {
          this.products = response;
        },
        error: (error) =>
        {
          console.log(error);
        }
      }
    )
  }

  navigateToProductDetails(productId: number) {
    this.router.navigate(['/productdetails', productId]);
  }
  getImagePath(imageName: string): string {
    if (imageName) {
      const base64Image = imageName;
      return `data:image/png;base64,${base64Image}`;
    } else {
      return '';
    }
  }
}