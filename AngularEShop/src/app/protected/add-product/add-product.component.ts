import { Component } from '@angular/core';
import { Product } from 'src/app/models/models';
import NavigationService from 'src/app/services/navigation.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productId: number = 0;
  categoryId: number = 0;
  productName: string = "";
  productPrice: number = 0;
  description: string = "";
  rating: number = 0;
  specification: string = "";
  reviewId: number = 0;
  productImage!: File;

  constructor(private navigationService: NavigationService) { }

  addProduct() {
    // Logic to add the product
    const product: Omit<Product, 'productId'> = {
      productName: this.productName,
      productPrice: this.productPrice,
      image: '',
      categoryId: this.categoryId,
      description: this.description,
      specification: this.specification,
      rating: this.rating,
      reviewId: this.reviewId
    }
    this.navigationService.addProduct(product).subscribe(
      response=>{
        this.productId = response.productId;
        alert('Added Succesfully');
      },
      error=>{
        console.log('Could not Add', error);
      }
    )
  }

  onFileSelected(event: any) {
    this.productImage = event.target.files[0];
  }

  uploadProductImage() {
    // Logic to upload the product image
    this.navigationService.uploadProductImage(this.productImage, this.productId).subscribe(
      response=>{
        alert('Image Uploaded Succesfully');
      },
      error=>{
        console.log('Could Not Upload', error);
      }
    )
  }
}
