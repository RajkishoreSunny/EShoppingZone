import { Component, OnInit } from '@angular/core';
import NavigationService from '../services/navigation.service';
import { Product } from '../models/models';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  ngOnInit(): void {
    this.products();
  }
  productId: number = 0;
  productImage!: File;
  constructor(private navigationService: NavigationService){}
  productList: any[] = [];
  selectedProduct: Product | any;
  baseUrl = "https://localhost:7092/api/";
  products(){
    this.navigationService.getProducts().subscribe((response)=>
    {
      this.productList = response;
    })
  }
  getImagePath(imageName: string): string {
    if (imageName) {
      const base64Image = imageName;
      return `data:image/png;base64,${base64Image}`;
    } else {
      return '';
    }
  }
  editProduct(product: Product): void {
    this.selectedProduct = product; // Create a copy of the selected product
    this.productId = this.selectedProduct.productId;
  }
  onFileSelected(event: any) {
    this.productImage = event.target.files[0];
  }
  uploadProductImage(){
    this.navigationService.uploadProductImage(this.productImage, this.productId).subscribe(
      response=>{
        alert('Image updated Successfully');
      },
      error=>{
        console.log('Couldnot update' + error);
      }
    )
  }
  updateProduct(): void{
    let url = this.baseUrl + 'Product/UpdateProduct/' + this.selectedProduct.productId;
    this.navigationService.updateProduct(url, this.selectedProduct).subscribe((response)=>
    {
      alert("Updated" + response);
    },
      (error)=> {
        alert("Not Updated" + error);
      }
    );
  }
  deleteProduct(): void{
    let url = this.baseUrl + 'Product/DeleteProduct/' + this.selectedProduct.productId;
    this.navigationService.deleteProduct(url).subscribe((response)=>
    {
      alert("Deleted" + response);
    },
    (error)=>
    {
      alert("Not Deleted" + error);
    })
  }
}
