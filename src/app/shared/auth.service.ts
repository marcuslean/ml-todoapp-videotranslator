import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth
  loggedIn = new BehaviorSubject<boolean>(false)
  // allowedUsers = [
  //   { email: "example@place.com", password: "password" }
  // ]

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDTv5CdI_1XSowArmmXAL4EuQBs_ixS5Q0",
      authDomain: "todo-app-730dc.firebaseapp.com",
      projectId: "todo-app-730dc",
      storageBucket: "todo-app-730dc.appspot.com",
      messagingSenderId: "501154263412",
      appId: "1:501154263412:web:ab4ab8cc551c41b2e03c21",
      measurementId: "G-W6Q73M4FSP"
    }
    const app = initializeApp(firebaseConfig)
    this.auth = getAuth(app)
  }

  ngInit() {
    // check session for valid token
    // then log user back in
  }

  signUp(email: string, password: string): string {
    // this.allowedUsers.push({ email: email, password: password })
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user
        this.loggedIn.next(true)
        return "Success"
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        return errorMessage
      });
    return "Failed"
  }

  login(email: string, password: string): boolean {
    // if (this.allowedUsers.find(user => user.email === email && user.password === password)) {
    //   this.loggedIn.next(true)
    //   return true;
    // }
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user
        this.loggedIn.next(true)
        return true
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
    return false
  }

  logout() {
    this.loggedIn.next(false)
  }
}
