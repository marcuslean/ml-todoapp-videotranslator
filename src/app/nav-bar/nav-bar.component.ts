import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  loggedIn: User | null = null

  constructor(private authService: AuthService, private router: Router) {
    authService.loggedIn.subscribe(res => {
      if (res !== null) { this.loggedIn = res }
      else { this.loggedIn = null }
    })
  }

  // function for logging the user out
  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/auth') // redirect user to login/signup page
  }
}
