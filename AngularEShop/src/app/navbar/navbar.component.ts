import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/models';
import NavigationService from '../services/navigation.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categoryList: any[] = [];

  loggedIn: boolean = false;
  //search bar code
  searchTerm: string = "";
  searchResults: string[] = [];

  handleSearch() {
    this.http.get<any[]>(`https://localhost:7092/api/Product/GetProductByName?name=${this.searchTerm}`)
    .subscribe(data => {
      if (data.length > 0) {
        const productId = data[0].productId;
        this.router.navigate(['/productdetails', productId]);
      } else {
        console.log('No match found');
      }
    });

  }
  handleInputChange(event: any) {
    const inputValue = event.target.value;
    this.searchTerm = inputValue;
    if (inputValue.length > 0) {
      this.handleSearch();
    } else {
      this.categoryList;
    }
  }

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((loggedIn) =>
      {
        this.loggedIn = loggedIn;
      });
      this.categories();
  }

  handleLinkClick(event: Event) {
    if (!this.loggedIn) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  logout() {
    this.authService.logoutUser();
  }
  
  constructor(private router: Router, private navigationService: NavigationService, private http: HttpClient, private authService: AuthService) {
    
    this.loggedIn = this.authService.isLoggedIn();
    this.authService.loggedIn$.subscribe((loggedIn) =>
    {
      this.loggedIn = loggedIn;
    });
  }
  navigationList: Category[] = [];
  routeToAbout(){
    this.router.navigate(['/about']);
  }
  routeToHome(){
    this.router.navigate(['']);
  }
  categories(){
    this.navigationService.getCategories().subscribe((response)=>
    {
      this.navigationList = response;
    }
    )
  }
  redirectToProducts(categoryId: number)
  {
    this.router.navigate(['/product'], { queryParams: {categoryId}});
  }
}
