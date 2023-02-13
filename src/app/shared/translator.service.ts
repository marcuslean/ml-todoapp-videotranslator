import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor(private dbService: DbService) { }

  translate(item: Todo) {
    let newValue = "translated"

    this.dbService.updateTask(item.id, "task", newValue)
    this.dbService.updateUser()
  }
}
