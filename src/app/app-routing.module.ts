import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListGuard } from './todo-list/todo-list.guard';
import { AdminGuard } from './admin/admin.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'todo', component: TodoListComponent, canActivate: [TodoListGuard] },
  { path: 'auth', component: AuthComponent, canActivate: [AuthGuard] },
  { path: 'users', component: AdminComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
