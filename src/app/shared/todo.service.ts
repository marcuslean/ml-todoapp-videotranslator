import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

import { getDatabase, ref, onValue, set, update, remove } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  db
  private _todos = new BehaviorSubject<Todo[]>([]) // list of all tasks
  todos = this._todos.asObservable()

  constructor(private authService: AuthService) {
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
    this.db = getDatabase(app)
    const tasksRef = ref(this.db, "tasks/")
    onValue(tasksRef, (snapshot) => { // subscribes to any changes to the /tasks endpoint
      this._todos.next(snapshot.val())
    })
  }

  // function for adding new tasks
  addTask(newTask: object, id: string) {
    try {
      set(ref(this.db, "/tasks/" + id), newTask)
    } catch (err) {
      console.error(err)
    }
  }

  // function for updating tasks
  updateTask(id: string, field: string, value: string | boolean) {
    try {
      update(ref(this.db, "/tasks/" + id + "/"), { [field]: value })
    } catch (err) {
      console.error(err)
    }
  }

  // function for deletting tasks
  deleteTask(id: string) {
    try {
      remove(ref(this.db, "/tasks/" + id))
    } catch (err) {
      console.error(err)
    }
  }
}
