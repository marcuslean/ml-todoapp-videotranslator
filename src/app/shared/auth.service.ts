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

  signUp(email: string, password: string) {
    this.allowedUsers.push({ email: email, password: password })
    this.loggedIn.next(true)
  }

  login(email: string, password: string): boolean {
    if (this.allowedUsers.find(user => user.email === email && user.password === password)) {
      this.loggedIn.next(true)
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn.next(false)
  }
}
