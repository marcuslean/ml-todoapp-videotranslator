import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAuth = false

  constructor(private authService: AuthService, private router: Router) {
    authService.loggedIn.subscribe(res => {
      if (res !== null && res.admin) { this.isAuth = true }
      else { this.isAuth = false }
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuth ? true : this.router.parseUrl("/todo");
  }

}
