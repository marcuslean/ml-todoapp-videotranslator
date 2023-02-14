import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private loggedIn = false

  constructor(private authService: AuthService, private router: Router) {
    // checks if user data exists from auth service
    authService.loggedIn.subscribe((res) => {
      if (res !== null) { this.loggedIn = true }
      else { this.loggedIn = false }
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // either allow user through or redirect them to todo page
    return this.loggedIn ? this.router.parseUrl("/todo") : true;
  }
}
