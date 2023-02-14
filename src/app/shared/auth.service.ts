import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth // firebase auth reference
  private db // firebase realtime database reference
  private _loggedIn = new BehaviorSubject<User | null>(null) // subscribable for logged in user data
  loggedIn = this._loggedIn.asObservable() // public acces to user data observable
  private _errorMsg = new BehaviorSubject<string>("") // subscribable for error messages
  errorMsg = this._errorMsg.asObservable() // public acces to error message observable

  constructor() {
    // initialise firebase app
    const firebaseConfig = {
      apiKey: "AIzaSyDTv5CdI_1XSowArmmXAL4EuQBs_ixS5Q0",
      authDomain: "todo-app-730dc.firebaseapp.com",
      projectId: "todo-app-730dc",
      storageBucket: "todo-app-730dc.appspot.com",
      messagingSenderId: "501154263412",
      appId: "1:501154263412:web:ab4ab8cc551c41b2e03c21",
      measurementId: "G-W6Q73M4FSP",
      databaseURL: "https://todo-app-730dc-default-rtdb.firebaseio.com/"
    }
    const app = initializeApp(firebaseConfig)
    this.auth = getAuth(app)
    this.db = getDatabase(app)
    setPersistence(this.auth, browserSessionPersistence) // allow users to stay logged in until the session has ended (e.g. tab closed)
    // check if there is an existing session with logged in user
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // gets currently logged in user's data from database
        get(child(ref(this.db), "users/" + user.uid))
          .then(snapshot => {
            if (!snapshot.exists()) { return console.error("Error: Cannot auto log in. User does not exist.") }
            this._loggedIn.next(Object.assign({ id: user.uid }, snapshot.val())) // adds relative id to the user data
          })
          .catch(err => {
            console.error(err)
          })
      }
    })
  }

  signUp(email: string, password: string, admin: boolean) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // signed in
        if (!userCredential.user.email) { return this._errorMsg.next("Error: User was not created") }

        const newUser = { email: userCredential.user.email, admin: admin, history: [] }
        set(ref(this.db, "/users/" + userCredential.user.uid), newUser) // add new user info to database
        this._loggedIn.next(Object.assign({ id: userCredential.user.uid }, newUser)) // set user data as subscribable
        this._errorMsg.next("")
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
        // gets user's data from database
        get(child(ref(this.db), "users/" + user.uid))
          .then(snapshot => {
            if (!snapshot.exists()) { return this._errorMsg.next("Error: User does not exist") }
            this._loggedIn.next(Object.assign({ id: user.uid }, snapshot.val())) // set existing user data as subscribable
            this._errorMsg.next("")
          })
          .catch(err => {
            this._errorMsg.next(err.message)
          })
      })
      .catch((error) => {
        // error occured
        this._errorMsg.next(this.errorHandling(error.message))
      })
  }

  logout() {
    // clear session storage
    sessionStorage.clear()
    this._loggedIn.next(null)
  }

  // function for handling error messages
  private errorHandling(err: string): string {
    if (err.includes("auth/user-not-found")) { return "Email does not exist" }
    if (err.includes("auth/wrong-password")) { return "Password incorrect" }
    if (err.includes("auth/invalid-email")) { return "Please enter a valid email" }
    if (err.includes("auth/invalid-password")) { return "Please enter a valid password" }
    return err
  }
}
