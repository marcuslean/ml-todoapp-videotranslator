import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  db
  todos = new BehaviorSubject<Todo[]>([]) // list of all tasks

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
    onValue(tasksRef, (snapshot) => {
      this.todos.next(snapshot.val())
    })
  }

  addTask(newTask: Todo) {
    set(ref(this.db, "tasks/" + uuid()), newTask)
  }
}
