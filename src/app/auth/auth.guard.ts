import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedIn = false

  constructor(private authService: AuthService, private router: Router) {
    authService.loggedIn.subscribe((res) => {
      if (res !== null) { this.loggedIn = true }
      else { this.loggedIn = false }
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loggedIn ? this.router.parseUrl("/todo") : true;
  }
}
