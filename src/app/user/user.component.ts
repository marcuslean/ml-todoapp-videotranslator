import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  signupMode = true; // current mode
  errorMsg = "";  // error message to display
  userInput = { email: "", password: "" } // forms' values

  constructor(private authService: AuthService) {
    // subscribing to any error message coming from auth service
    authService.errorMsg.subscribe(err => this.errorMsg = err)
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

    this.authService.signUp(this.userInput.email, this.userInput.password)
  }

  // function for logging in existing user
  login() {
    if (!this.userInput.email || !this.userInput.password) { return }

    this.authService.login(this.userInput.email, this.userInput.password)
  }
}
