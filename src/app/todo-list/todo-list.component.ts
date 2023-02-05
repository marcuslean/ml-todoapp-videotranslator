import { Component } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TranslatorService } from '../shared/translator.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  newTodo: string = "" // user input for new task
  todos: Todo[] = [] // list of all todo tasks

  constructor(private translator: TranslatorService) { }

  // function for adding new task to todo list
  addTodo() {
    this.todos.push({ task: this.newTodo, translated: false })
    this.newTodo = ""
  }

  // function for translating each task
  translate(task: string) {
    console.log(task)
  }
}
