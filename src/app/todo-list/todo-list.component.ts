import { Component } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TranslatorService } from '../shared/translator.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  newTodo: string = ""
  todos: Todo[] = [
    { task: "Something important", translated: false },
  ]

  constructor(private translator: TranslatorService) { }

  addTodo() {
    this.todos.push({ task: this.newTodo, translated: false })
    this.newTodo = ""
  }

  translate(task: string) {
    console.log(task)
  }
}
