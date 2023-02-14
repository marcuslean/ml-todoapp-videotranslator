import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private isAuth = false

  constructor(private authService: AuthService, private router: Router) {
    authService.loggedIn.subscribe(res => {
      // checks if user is an admin or not
      if (res !== null && res.admin) { this.isAuth = true }
      else { this.isAuth = false }
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // either allow user through or redirect them to todo page
    return this.isAuth ? true : this.router.parseUrl("/todo");
  }

}
