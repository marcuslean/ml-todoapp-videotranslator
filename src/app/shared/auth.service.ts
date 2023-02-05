import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false)
  allowedUsers = [
    { email: "example@place.com", password: "password" }
  ]

  constructor() { }

  signUp() {

  }

  login(email: string, password: string): boolean {
    if (this.allowedUsers.find(user => user.email === email && user.password === password)) {
      this.loggedIn.next(true)
      return true;
    }
    return false;
  }
}
