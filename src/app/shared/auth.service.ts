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
  private auth
  private db
  private _loggedIn = new BehaviorSubject<User | null>(null)
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
      measurementId: "G-W6Q73M4FSP",
      databaseURL: "https://todo-app-730dc-default-rtdb.firebaseio.com/"
    }
    const app = initializeApp(firebaseConfig)
    this.auth = getAuth(app)
    this.db = getDatabase(app)
    setPersistence(this.auth, browserSessionPersistence) // allow users to stay logged in until the session has ended (e.g. tab closed)
    onAuthStateChanged(this.auth, (user) => { // check if there is an existing session with logged in user
      if (user) {
        get(child(ref(this.db), "users/" + user.uid))
          .then(snapshot => {
            if (!snapshot.exists()) { return console.error("Error: Cannot auto log in. User does not exist.") }
            this._loggedIn.next(Object.assign({ id: user.uid }, snapshot.val()))
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
        set(ref(this.db, "/users/" + userCredential.user.uid), newUser)
        this._loggedIn.next(Object.assign({ id: userCredential.user.uid }, newUser))
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
        get(child(ref(this.db), "users/" + user.uid))
          .then(snapshot => {
            if (!snapshot.exists()) { return console.error("Error: User does not exist") }
            this._loggedIn.next(Object.assign({ id: user.uid }, snapshot.val()))
          })
          .catch(err => {
            console.error(err)
          })
      })
      .catch((error) => {
        // error occured
        this._errorMsg.next(error.message)
      })
  }

  logout() {
    sessionStorage.clear()
    this._loggedIn.next(null)
  }
}
