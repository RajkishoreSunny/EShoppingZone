import { Component } from '@angular/core';
import { Category } from 'src/app/models/models';
import NavigationService from 'src/app/services/navigation.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryName: string = "";
  subcategory: string = "";
  categoryImage!: File;
  categoryId: number = 0;
  products: any[] = [];
  constructor(private navigationService: NavigationService){}
  createCategory(){
    const category: Omit<Category, 'categoryId'> = {
      categoryName: this.categoryName,
      categoryImg: '',
      subcategory: this.subcategory,
      products: []
    }
    this.navigationService.addCategory(category).subscribe(
      response=> {
        this.categoryId = response.categoryId
        alert('Category Added');
      },
      error=>{
        console.log(error, "Couldn't add");
      }
    )
  }
  onFileSelected(event:any){
    this.categoryImage = event.target.files[0];
  }
  uploadImage(){
    this.navigationService.uploadImage(this.categoryImage, this.categoryId).subscribe(
      response =>{
        alert('Image Uploaded Successfully');
      },
      error => {
        console.log("Couldn't upload", error);
      }
    )
  }
}
