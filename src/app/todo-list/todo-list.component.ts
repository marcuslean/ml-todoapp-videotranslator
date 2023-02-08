import { Component } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TranslatorService } from '../shared/translator.service';
import { TodoService } from '../shared/todo.service';
import { AuthService } from '../shared/auth.service';

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
    authService.loggedIn.subscribe(res => this.user = res)
    todoService.todos.subscribe(res => {
      this.todos = []

      Object.values(res).forEach(task => this.todos.push(task))
    })
  }

  // function for adding new task to todo list
  addTodo() {
    if (this.user === null || this.newTask === "") { return }

    // this.todos.push({ task: this.newTodo, translated: false })
    const newTask: Todo = { task: this.newTask, owner: this.user, translated: false }

    this.todoService.addTask(newTask)
    this.newTask = ""
  }

  // function for translating each task
  translate(task: string) {
    console.log(task)
  }
}
