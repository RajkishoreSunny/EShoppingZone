import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, catchError, tap } from 'rxjs';
import { CartItem, Category, Order, Product, WishListItem } from '../models/models';
import { AuthService } from '../login/auth.service';


@Injectable({
  providedIn: 'root'
})
export default class NavigationService {
  baseUrl = "https://localhost:7092/api/";

  constructor(private http: HttpClient, private authService: AuthService) 
  {
   }
  getCategoryList(categoryId: number): Observable<Product[]>{
    const url = `${this.baseUrl}Product/GetProductsByCategory/category/${categoryId}/products`;
    return this.http.get<Product[]>(url)
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'Category/GetAllCategories');
  }

  getProducts(){
    return this.http.get<any[]>(this.baseUrl + 'Product/GetAllProducts');
  }
  updateProduct(url: string, product: Product): Observable<any>{
    return this.http.put(url, product);
  }
  deleteProduct(url: string): Observable<any>{
    return this.http.delete(url);
  }
  private products:BehaviorSubject<any> = new BehaviorSubject<any>(null);
   setProduct(data:any)
  {
   
    this.products.next(data);
  }

  getProduct():Observable<any>
  {
    return this.products.asObservable();
  }
 
  getProductById(productId: number): Observable<Product> {
    const url = `${this.baseUrl}Product/GetProductById/${productId}`;
    return this.http.get<Product>(url);
  }
  uploadImage(file: File, categoryId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.baseUrl}Category/uploadImage?id=${categoryId}`,formData);
  }
  addCategory(category: Omit<Category, 'categoryId'>): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
      return throwError('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}Category/AddCategory`, category, {headers}).pipe(
      tap(() => {
        
      }),
      catchError(error => {
        if(error.status === 401){
          alert('Session expired. Please Login again!');
          this.authService.logoutUser();
        }
        return throwError(error);
      })
    );;
  }
  addProduct(product: Omit<Product, 'productId'>): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
      return throwError('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}Product/AddProduct`, product, {headers}).pipe(
      tap(() => {
        
      }),
      catchError(error => {
        if(error.status === 401){
          alert('Session expired. Please Login again!');
          this.authService.logoutUser();
        }
        return throwError(error);
      })
    );;
  }
  uploadProductImage(file: File, productId: number): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.baseUrl}Product/UploadProductImage?id=${productId}`, formData);
  }

  //Cart
  addToCartTable(userId: number, productId: number, quantity: number, totalPrice: number): Observable<any>{
    const url = `${this.baseUrl}Cart/AddToCart`;
    const body = { userId, productId, quantity, totalPrice };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwtTokenUser')}`
    };
    return this.http.post(url, body, {headers}).pipe(
      tap(() => {
      }),
      catchError(error => {
        if(error.status === 401){
          alert('Session expired. Please Login again!');
          this.authService.logoutUser();
        }
        return throwError(error);
      })
    );
  }
  getItemsFromCart(userId: number): Observable<any>{
    const url = `${this.baseUrl}Cart/GetItemsByUserId?userId=${userId}`;
    const token = localStorage.getItem('jwtTokenUser');
    
    if (!token) {
      return throwError('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(url, {headers: headers}).pipe(
      tap(() => {
        
      }),
      catchError(error => {
        if(error.status === 401){
          alert('Session expired. Please Login again!');
          this.authService.logoutUser();
        }
        return throwError(error);
      })
    );
  }
  QuantityInCart(productId: number, userId: number, quantity: number): Observable<any> {
    const url = `${this.baseUrl}Cart/UpdateQuantity`;
    const payload = {
      productId: productId,
      userId: userId,
      quantity: quantity
    };
    const token = localStorage.getItem('jwtTokenUser');
    
    if (!token) {
      return throwError('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(url, payload, {headers}).pipe(
      tap(() => {
        
      }),
      catchError(error => {
        if(error.status === 401){
          alert('Session expired. Please Login again!');
          this.authService.logoutUser();
        }
        return throwError(error);
      })
    );
  }
  deleteItemFromCart(cart: CartItem): Observable<any>{
    const url = `${this.baseUrl}Cart/DeleteFromCart`;
    const token = localStorage.getItem('jwtTokenUser');
    
    if (!token) {
      return throwError('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(url, { headers: headers, body: cart }).pipe(
      tap(() => {
        
      }),
      catchError(error => {
        if(error.status === 401){
          alert('Session expired. Please Login again!');
          this.authService.logoutUser();
        }
        return throwError(error);
      })
    );
  }
  clearCart(userId: number){
    return this.http.post(`${this.baseUrl}Cart/ClearCart?userId=${userId}`, {}).pipe(
      tap(() => {
        
      })
    );
  }

  //WishList
  WishListItems(userId: number): Observable<any>{
    const url = `${this.baseUrl}WishList/GetAllWishListItems?userId=${userId}`;
    const token = localStorage.getItem('jwtTokenUser');
    
    if (!token) {
      return throwError('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(url, {headers}).pipe(
      tap(() => {
        
      }),
      catchError(error => {
        if(error.status === 401){
          alert('Session expired. Please Login again!');
          this.authService.logoutUser();
        }
        return throwError(error);
      })
    );
  }
  moveToWishList(userId: number, productId: number, totalPrice: number): Observable<any>{
    const url = `${this.baseUrl}WishList/AddToWishList`;
    const payload = {
      userId: userId,
      productId: productId,
      totalPrice: totalPrice
    };
    const token = localStorage.getItem('jwtTokenUser');
    
    if (!token) {
      return throwError('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(url, payload, {headers}).pipe(
      tap(() => {
        
      }),
      catchError(error => {
        if(error.status === 401){
          alert('Session expired. Please Login again!');
          this.authService.logoutUser();
        }
        return throwError(error);
      })
    );
  }
  removeFromWishList(wishList: WishListItem): Observable<any>{
    const url = `${this.baseUrl}WishList/DeleteFromWishList`;
    const token = localStorage.getItem('jwtTokenUser');
    
    if (!token) {
      return throwError('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(url, { headers: headers, body: wishList }).pipe(
      tap(() => {
        
      }),
      catchError(error => {
        if(error.status === 401){
          alert('Session expired. Please Login again!');
          this.authService.logoutUser();
        }
        return throwError(error);
      })
    );
  }
  //userInfo
  getUserInfo(userId: number){
    return this.http.get(`${this.baseUrl}User/GetUserById/${userId}`);
  }
  uploadUserImg(file: File, userId: number): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('formFile', file, file.name);
    return this.http.post<any>(`${this.baseUrl}User/UploadImage?id=${userId}`, formData);
  }

  //Review
  getReviews(productId: number){
    const url = `${this.baseUrl}Review/GetAllReviews?productId=${productId}`;
    return this.http.get(url);
  }
  saveReview(reviewId: number, productId: number, description: string, rating: number){
    const url = `${this.baseUrl}Review/AddReview`;
    const payload = {
      reviewId: reviewId,
      productId: productId,
      description: description,
      rating: rating
    };
    return this.http.post(url, payload);
  }
  addImage(file: File, productId: number): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('formFile', file, file.name);
    return this.http.post<any>(`${this.baseUrl}Review/UploadImage?id=${productId}`, formData);
  }
  fetchRecord(): Observable<any>{
    const url = `${this.baseUrl}Review/GetLastRecord`;
    return this.http.get(url);
  }

  //order
  placeOrder(orderData: { userId: number, orderDetails: any }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Order/AddOrder`, orderData);
  }
  
  //feedback
  addFeedback(userId: number, feedback: string): Observable<any> {
    const feedbackData = { userId: userId, description: feedback }
    return this.http.post<any>(`${this.baseUrl}Feedback/AddFeedback`, feedbackData);
  }
  getFeedbacks(){
    const url = `${this.baseUrl}Feedback/GetFeedbacks`;
    return this.http.get(url);
  }
  //Forgot Password
  sendEmail(email: string){
    return this.http.post<any>(`${this.baseUrl}User/ForgotPassword?email=${email}`, email);
  }
  changePassword(email: string, newPassword: string): Observable<any> {
    const requestBody = { email, newPassword };
    return this.http.post<any>(`${this.baseUrl}User/ChangePassword?email=${email}&newPassword=${newPassword}`, requestBody);
  }

  //addDetails
  updateUser(userId: number, user: Array<string>){
    const url = this.baseUrl + `User/UpdateUser/${userId}`;
    return this.http.put(url, user);
  }
}