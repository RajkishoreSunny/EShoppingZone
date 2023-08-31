import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './login/auth.service';
import { ProductComponent } from './product/product.component';
import { SuggestedProductsComponent } from './suggested-products/suggested-products.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { OpenProductsDirective } from './open-products.directive';
import { OpenProductDetailsDirective } from './Directives/open-product-details.directive';
import { AdminComponent } from './admin/admin.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './login/auth.guard';
import { AddProductComponent } from './protected/add-product/add-product.component';
import { AddCategoryComponent } from './protected/add-category/add-category.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CheckfeedbackComponent } from './protected/checkfeedback/checkfeedback.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    ProductComponent,
    SuggestedProductsComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,
    OpenProductsDirective,
    OpenProductDetailsDirective,
    AdminComponent,
    ProtectedComponent,
    AddProductComponent,
    AddCategoryComponent,
    WishListComponent,
    OrderDetailsComponent,
    FeedbackComponent,
    CheckfeedbackComponent,
    ChangePasswordComponent,
    UserDetailsComponent,
    PaymentPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    [AuthGuard],
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
