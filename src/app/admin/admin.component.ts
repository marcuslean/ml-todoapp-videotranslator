import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { DbService } from '../shared/db.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  allUsers: User[] = []

  constructor(private dbService: DbService) { }

  ngOnInit() {
    // get all updated user data
    this.allUsers = this.dbService.getAllUsers()
  }
}