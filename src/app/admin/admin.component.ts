import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { DbService } from '../shared/db.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  displayedColumns: string[] = ['email', 'translated', 'history']
  dataSource: User[] = []

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.dataSource = this.dbService.getAllUsers() // get updated user data
  }
}