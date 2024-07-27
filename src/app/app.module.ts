import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api'; // Import MessageService
import {AccordionModule} from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {CalendarModule} from 'primeng/calendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todolist/todo-list/todo-list.component';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {TabMenuModule} from 'primeng/tabmenu';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { CorrespondenceComponent } from './correspondence/correspondence.component';
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    AssignTaskComponent,
    CorrespondenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ContextMenuModule,
    DialogModule,
    AccordionModule,
    TooltipModule,
    DropdownModule,
    CardModule,
    CalendarModule,
    MenuModule,
    TabMenuModule
 
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
