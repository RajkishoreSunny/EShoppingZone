import { Directive, HostListener, Input, } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[OpenProducts]'
})
export class OpenProductsDirective{
  @Input('productId') productId: number = 2;

  constructor(private router: Router) { }

  @HostListener('click')
  onClick() {
    this.router.navigate(['/productdetails', this.productId]);
  }
  } 
