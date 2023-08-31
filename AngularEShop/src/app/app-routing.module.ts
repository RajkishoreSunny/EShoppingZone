import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './login/auth.guard';
import { ProtectedComponent } from './protected/protected.component';
import { SuggestedProductsComponent } from './suggested-products/suggested-products.component';
import { AddProductComponent } from './protected/add-product/add-product.component';
import { AddCategoryComponent } from './protected/add-category/add-category.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CheckfeedbackComponent } from './protected/checkfeedback/checkfeedback.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'product', component: ProductComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'productdetails', component: ProductDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'wishlist', component: WishListComponent},
  {path: 'order', component: OrderComponent},
  {path: 'admin', component: AdminComponent},
  { path: 'productdetails/:productId', component: ProductDetailsComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'addproduct', component: AddProductComponent, canActivate: [AuthGuard] },
  {path: 'addcategory', component: AddCategoryComponent, canActivate: [AuthGuard]},
  {path: 'checkfeedback', component: CheckfeedbackComponent, canActivate: [AuthGuard]},
  {path: 'contactfeedback', component: FeedbackComponent},
  { path:'suggested-products', component: SuggestedProductsComponent },
  {path: 'orderdetails', component: OrderDetailsComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  {path: 'userDetails', component: UserDetailsComponent},
  {path: 'payment', component: PaymentPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
