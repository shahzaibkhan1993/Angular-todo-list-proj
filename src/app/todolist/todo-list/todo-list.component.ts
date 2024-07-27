import { Component, OnInit,ViewChild } from '@angular/core';
import {MessageService,MenuItem  } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/task.service'; // Import the Task interface from task service

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  
  tasks = [];
  filter = 'all';
  newTaskTitle = '';
  dateFormat='dd/MM/yyyy hh:mm:ss';
  taskCreatedDate : Date = new Date();
  taskDueDate:Date | null = null;
  selectedTask: Task | null = null;
  taskDetails = '';
  displayAddTaskDialog = false;
  displayViewTaskDialog = false;
  contextMenuItems: MenuItem[] = [];
  @ViewChild('cm', { static: true }) contextMenu!: ContextMenu;
  divVisible: boolean = false;
  newTaskImportance = '';
  minDate: Date;

  importanceLevels = [
    { label: 'Low', value: 'Low',icon: 'pi pi-circle-fill',color:'#dc3545' },
    { label: 'Medium', value: 'Medium',icon: 'pi pi-circle-fill',color:'#ff7900' },
    { label: 'High', value: 'High',icon: 'pi pi-circle-fill',color:'#28a745' }
  ];

  constructor(
    private taskService: TaskService,
    private messageService: MessageService
  ) { 
    this.minDate = new Date(); // Set the minimum date to today
  }

  ngOnInit() {
    this.loadTasks();

    this.contextMenuItems = [
      
      { label: 'Add Task Details', icon: 'pi pi-plus', command: () => this.showViewTaskDialog() }
    ];
  }
    loadTasks(){
      this.tasks = this.taskService.getTasks();
      this.applyFilter();
    }
  
    addTask() {
      if (this.newTaskTitle.trim() && this.newTaskImportance && this.taskDueDate) {
        this.taskService.addTask(this.newTaskTitle,this.newTaskImportance,this.taskDueDate);
        this.newTaskTitle = '';
        this.newTaskImportance = '';
        this.taskDueDate=null;
        this.messageService.add({key: 'addTask',severity:'success', summary:'Successfully', detail:'added your New Task in list.'});
        this.loadTasks();
        
      }
      else{
        this.messageService.add({key: 'addTask',severity:'warn', summary:'Not Added!', detail:'Please select priority,due date & write task title.'});
      }
    }  
  
    deleteTask(id: number) {
      this.taskService.deleteTask(id);
      this.messageService.add({key: 'addTask',severity:'error', summary:'Successfully', detail:'Task Deleted.'});
      this.loadTasks();
    }
  
    archiveTask(id: number) {
      this.taskService.archiveTask(id);
      this.loadTasks();
    }
  
    unarchiveTask(taskId: number) {
      this.taskService.unarchiveTask(taskId);
      this.loadTasks();
    }
    getStatus(task: Task): string {
      return task.completed ? 'Completed' : 'Pending';
    }
  
    toggleCompletion(id: number) {
      this.taskService.toggleCompletion(id);
      this.loadTasks();
    }
  
    setFilter(filter: string) {
      this.filter = filter;
      this.loadTasks();
    }
  
    applyFilter() {
      switch (this.filter) {
        case 'completed':
          this.tasks = this.tasks.filter(task => task.completed && !task.archived);
          break;
        case 'pending':
          this.tasks = this.tasks.filter(task => !task.completed && !task.archived);
          break;
        case 'archived':
          this.tasks = this.tasks.filter(task => task.archived);
          break;
          
        default:
          this.tasks = this.taskService.getTasks();
          break;
      }
    }
  
    toggleTaskClick(task: Task) {
          this.tasks.forEach(t => {
        if (t === task) {
          t.clicked = !t.clicked; // Toggle the clicked property of the clicked task
          this.taskDetails = t.details; // Set the taskDetails to the details of the clicked task
        } else {
          t.clicked = false; // Set all other tasks' clicked property to false
        }
      });
      this.selectedTask = task; // Set the selected task
          
    }
    
    onRightClick(event: MouseEvent, task: Task) {
      this.selectedTask = task;
      if (this.contextMenu) {
        this.contextMenu.show(event);
      }
      event.preventDefault();
    }
  
    
    isSaveAction:boolean=false;
    showViewTaskDialog() {
      this.isSaveAction=false;
      this.displayViewTaskDialog = true;
     
    }

    saveTaskDetails() {
      if (this.selectedTask) {
        this.selectedTask.details = this.taskDetails; // Save the task details
       
        this.taskService.updateTask(this.selectedTask);
        this.isSaveAction = true; // Set the flag to true when saving
      
        this.displayViewTaskDialog = false;
       
        this.loadTasks();
        this.messageService.clear();
        this.messageService.add({ key: 'addDetails', severity: 'success', summary: 'Success', detail: 'Task details updated.' });
        
      }

      
    }
    onDialogHide() {
      if (this.isSaveAction) {
        // The dialog was closed by the save action, the toast message is already shown in saveTaskDetails
        this.isSaveAction = false; // Reset the flag
      } else {
        // The dialog was closed without saving, do not show the toast message
        this.messageService.clear();
      }
    }

    onDateSelect(): void {
      // This method can contain additional logic if needed
      this.taskDueDate = new Date(this.taskDueDate!); // Ensure the date is updated correctly
    }
  
    

}


