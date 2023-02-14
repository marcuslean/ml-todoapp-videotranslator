import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { DbService } from '../shared/db.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  loggedIn: User | null = null // User data

  constructor(private authService: AuthService, private router: Router) {
    // subscribes to user data from auth service
    authService.loggedIn.subscribe(res => {
      // checks if user data exists
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
