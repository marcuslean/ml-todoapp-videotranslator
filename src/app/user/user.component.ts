import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  signupMode = true;
  errorMsg = "";
  userInput = { email: "", password: "" }

  constructor(private authService: AuthService) { }

  signUp() {

  }

  login() {
    if (!this.userInput.email || !this.userInput.password) { return; }
    if (!this.authService.login(this.userInput.email, this.userInput.password)) {
      this.errorMsg = "Error"
    } else {
      this.errorMsg = ""
    }
  }

}
