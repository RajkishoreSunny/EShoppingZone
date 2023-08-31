import { Router } from '@angular/router';
import { OpenProductsDirective } from './open-products.directive';

describe('OpenProductsDirective', () => {
  it('should create an instance', () => {
    const routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);
    const directive = new OpenProductsDirective(routerMock);
    expect(directive).toBeTruthy();
  });
});
