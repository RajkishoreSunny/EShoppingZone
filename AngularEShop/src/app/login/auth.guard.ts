import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.loggedIn$.pipe(
      map((loggedIn: boolean) => {
        if (loggedIn) {
          return true; // User is authenticated, allow access to the route
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // User is not authenticated, redirect to the login page
          return false;
        }
      })
    );
  }
};
