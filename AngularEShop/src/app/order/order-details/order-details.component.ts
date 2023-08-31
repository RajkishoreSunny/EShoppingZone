import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import NavigationService from '../../services/navigation.service';
import { forkJoin, map } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderData: any;
  userInfo: any;
  productId: number[] = [];
  products: string[] = [];
  constructor(private route: ActivatedRoute, private navigationService: NavigationService,
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.orderData = JSON.parse(params['order']);
      this.userInfo = JSON.parse(params['userInfo']);
      this.orderData.forEach((item: any) => {
        this.productId.push(item.productId);
      });
    });
    this.getProductNames();
  }
  
  getProductNames(): void {
    const productIds = this.orderData.map((item: any) => item.productId);
    const observables = productIds.map((productId: number) =>
      this.navigationService.getProductById(productId).pipe(
        map((product: any) => product.productName)
      )
    );
  
    forkJoin<string[]>(observables).subscribe(
      (products: string[]) => {
        this.products = products;
      },
      (error) => {
        console.log('Failed to get product names', error);
      }
    );
  }
  calculateTotalPrice(): number {
    let totalPrice = 0;
    this.orderData.forEach((item: any) => {
      totalPrice += item.totalPrice;
    });
    return totalPrice;
  }
  downloadPdf(){
    //pdf generation
    var doc = new jsPDF();
    autoTable(doc, {html: "#invoice"});
    doc.save("productInvoice");
    const userId = Number(localStorage.getItem('userId'));
      this.navigationService.clearCart(userId).subscribe(
        () => alert('Order Placed!!! Thank You for Shopping with us!!!'),
        (error) => console.log(error)
      );
  }
  
  
    
  
}
