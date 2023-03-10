import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  signupMode = false; // current mode
  admin = false; // new user type
  errorMsg = "";  // error message to display
  userInput = { email: "", password: "" } // forms' values

  constructor(private authService: AuthService, private router: Router) {
    // subscribe to any error message coming from auth service
    authService.errorMsg.subscribe(err => this.errorMsg = err)
    // subscrive to current user data coming from auth service
    authService.loggedIn.subscribe(res => {
      // if existing user data exist redirect them to todo page
      if (res !== null) { router.navigateByUrl('/todo') }
    })
  }

  // function for clearing form and changing mode
  changeMode() {
    this.userInput.email = ""
    this.userInput.password = ""
    this.signupMode = !this.signupMode
  }

  // function for signing up a new user
  signUp() {
    if (!this.userInput.email || !this.userInput.password) { return }

    this.authService.signUp(this.userInput.email, this.userInput.password, this.admin)
  }

  // function for logging in existing user
  login() {
    if (!this.userInput.email || !this.userInput.password) { return }

    this.authService.login(this.userInput.email, this.userInput.password)
  }
}
