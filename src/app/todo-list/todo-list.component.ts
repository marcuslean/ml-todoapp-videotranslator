import { Component } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TranslatorService } from '../shared/translator.service';
import { TodoService } from '../shared/todo.service';
import { AuthService } from '../shared/auth.service';

import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  newTask: string = "" // user input for new task
  user: string | null = null
  todos: Todo[] = [] // list of all todo tasks

  constructor(private todoService: TodoService, private translator: TranslatorService, private authService: AuthService) {
    authService.loggedIn.subscribe(res => this.user = res) // gets current user
    todoService.todos.subscribe(res => { // gets most updated list of todos
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

    const newTask = { task: this.newTask, owner: this.user, completed: false, translated: false }

    this.todoService.addTask(newTask, uuid())
    this.newTask = ""
  }

  // function for completing tasks
  updateTask(item: Todo) {
    this.todoService.updateTask(item.id, "completed", !item.completed)
  }

  // function for deleting tasks
  deleteTask(item: Todo) {
    this.todoService.deleteTask(item.id)
  }

  // function for translating each task
  translateTask(item: Todo) {
    console.log(item)
  }
}
