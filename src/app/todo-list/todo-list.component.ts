import { Component } from '@angular/core';
import { TranslatorService } from '../shared/translator.service';
import { DbService } from '../shared/db.service';
import { AuthService } from '../shared/auth.service';

import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  newTask: string = "" // user input for new task
  user: User | null = null // current user
  todos: Todo[] = [] // list of all todo tasks

  constructor(private dbService: DbService, private translator: TranslatorService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe(res => this.user = res) // gets current user
    this.dbService.todos.subscribe(res => { // gets most updated list of todos
      this.todos = []

      // gets every task and adds respective id elements to it
      Object.values(res).forEach((task, i) => {
        let merged = Object.assign({ id: Object.keys(res)[i] }, task)
        this.todos.push(merged)
      })
    })
  }

  // function for adding new task to todo list
  addTask() {
    if (this.user === null || this.newTask === "") { return }

    const newTask = { task: this.newTask, owner: this.user.id, completed: false, translated: false }

    this.dbService.addTask(newTask)
    this.newTask = ""
  }

  // function for completing tasks
  updateTask(item: Todo) {
    this.dbService.updateTask(item.id, "completed", !item.completed)
  }

  // function for deleting tasks
  deleteTask(item: Todo) {
    this.dbService.deleteTask(item.id)
  }

  // function for translating each task
  translateTask(item: Todo) {
    this.translator.translate(item)
  }
}
