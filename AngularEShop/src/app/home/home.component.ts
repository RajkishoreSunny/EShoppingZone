import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import NavigationService from '../services/navigation.service';
import { Category, Product } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | undefined;
  products: Product[] = [];
  categoryId: number = 1;
  constructor(private router: Router, private navigationService: NavigationService){}
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories(){
    this.navigationService.getCategories().subscribe((response) => 
    {
      this.categories = response;
    }, (error) => {
      console.log(error);
    });
  }

  getImagePath(imageName: string): string {
    if (imageName) {
      const base64Image = imageName;
      return `data:image/png;base64,${base64Image}`;
    } else {
      return '';
    }
  }
  redirectToProducts(categoryId: number)
  {
    this.router.navigate(['/product'], { queryParams: {categoryId}});
  }
}
