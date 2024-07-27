import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todolist/todo-list/todo-list.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { CorrespondenceComponent } from './correspondence/correspondence.component';

const routes: Routes = [
  { path: 'todo-list', component: TodoListComponent },
  { path: 'assign-task', component: AssignTaskComponent },
  {path:'correspondence',component:CorrespondenceComponent},
  { path: '', redirectTo: '/todo-list', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
