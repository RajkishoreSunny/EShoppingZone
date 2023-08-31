import { Component, Input, OnInit } from '@angular/core';
import NavigationService from '../services/navigation.service';
import { CartItem, Product, Review, WishListItem } from '../models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() productId: number = 4;
  product: Product | undefined;
  isAddedToCart: boolean = false;
  rating: number = 0;
  reviewText: string = '';
  isLoggedIn: boolean = false;
  reviews: any[] = [];
  reviewSavedSuccessfully: boolean = false;
  reviewImage!: File;
  reviewId: number = 0;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      this.loadProductDetails();
    });
    if(this.authService.isLoggedIn()){
      this.isLoggedIn = true;
    }
    this.getReviews(this.productId);
    this.fetchDetails();
  }
  fetchDetails(){
    this.navigationService.fetchRecord().subscribe(
      res => {
        this.reviewId = res.reviewId + 1;
      }
    );
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
  
  loadProductDetails() {
    this.navigationService.getProductById(this.productId).subscribe(
      (response) => {
        this.product = response;
      },
      (error) => {
        console.log('Error fetching product details:', error);
      }
    );
  }
  products: any[] = [];
  constructor(private navigationService: NavigationService, 
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    ) {
  }
  getImagePath(imageName: string | undefined): string {
    if (imageName) {
      const base64Image = imageName;
      return `data:image/png;base64,${base64Image}`;
    } else {
      return '';
    }
  }

  moveToWishList(productId: number, productPrice: number){
    if (this.authService.isLoggedIn()) {
      const userId = Number(localStorage.getItem('userId'));
      const pId = productId;
      const totalPrice = productPrice;
  
      this.navigationService.WishListItems(userId).subscribe(
        (response) => {
          const wishListItems = response;
  
          const existingItem = wishListItems.find((item: WishListItem) => item.productId === pId);
          if (existingItem) {
           alert('Already in WishList');
          } else {
            // Product does not exist in the wishList, add a new item
            this.navigationService
              .moveToWishList(userId, pId, totalPrice)
              .subscribe(
                (response) => {
                  console.log('Item moved to wishlist:', response);
                  alert('Added Successfully');
                },
                (error) => {
                  console.error('Failed to add item to wishlist:', error);
                }
              );
          }
        },
        (error) => {
          console.error('Failed to retrieve wishlist items:', error);
        }
      );
    } else {
      alert('Please Login!');
      this.router.navigate(['/login']);
    }
  }
  saveReview(productId: number, description: string, rating: number){
    if(this.authService.isLoggedIn()){
      this.isLoggedIn = true;
      if(!this.reviewText || this.rating === 0){
        return;
      }
      this.navigationService.saveReview(this.reviewId, productId, description, rating).subscribe(
        () =>{
          alert('Saved');
          this.reviewSavedSuccessfully = true;
        },
        error => {
          console.log(error);
          alert('Some error occured');
        }
      )
    }

  }
  getReviews(productId: number){
    this.navigationService.getReviews(productId).subscribe(
      (res: any) => {
        this.reviews = res;
      }
    )
  }
  onFileSelected(event:any){
    this.reviewImage = event.target.files[0];
  }
  uploadImage(){
    if(this.authService.isLoggedIn() && this.reviewImage){
    this.navigationService.addImage(this.reviewImage, this.productId).subscribe(
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
  
  increaseRating() {
    if (this.rating < 10) {
      this.rating++;
    }
  }

  decreaseRating() {
    if (this.rating > 0) {
      this.rating--;
    }
  }
}
