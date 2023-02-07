import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth
  private _loggedIn = new BehaviorSubject<boolean>(false)
  loggedIn = this._loggedIn.asObservable()
  private _errorMsg = new BehaviorSubject<string>("")
  errorMsg = this._errorMsg.asObservable()

  constructor() {
    // initialise firebase app
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
    setPersistence(this.auth, browserSessionPersistence) // allow users to stay logged in until the session has ended (e.g. tab closed)
    onAuthStateChanged(this.auth, (user) => { // check if there is an existing session with logged in user
      if (user) {
        this._loggedIn.next(true)
      }
    })
  }

  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // signed in
        const user = userCredential.user
        this._loggedIn.next(true)
      })
      .catch((error) => {
        // error occured
        this._errorMsg.next(error.message)
      })
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // signed in
        const user = userCredential.user
        this._loggedIn.next(true)
      })
      .catch((error) => {
        // error occured
        this._errorMsg.next(error.message)
      })
  }

  logout() {
    sessionStorage.clear()
    this._loggedIn.next(false)
  }
}
