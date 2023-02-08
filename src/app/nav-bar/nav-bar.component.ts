import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  loggedIn = false

  constructor(private authService: AuthService) {
    authService.loggedIn.subscribe(res => {
      if (res !== null) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    })
  }

  // function for logging the user out
  logout() {
    this.authService.logout()
  }
}
