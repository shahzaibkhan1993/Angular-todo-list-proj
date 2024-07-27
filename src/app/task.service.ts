import { Injectable } from '@angular/core';


export interface Task {
  id: number;
  title: string;
  completed: boolean;
  archived: boolean;
  clicked?: boolean; // Optional property for tracking click state
  details?: string;
  importance?: string; // New property for task importance
  dueDate: Date; // Add due date field
}


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];
  private nextId = 1;

  constructor() { }

  // getTasks(filter: string): Task[] {
  //   if (filter === 'completed') {
  //     return this.tasks.filter(task => task.completed && !task.archived);
  //   } else if (filter === 'pending') {
  //     return this.tasks.filter(task => !task.completed && !task.archived);
  //   } else if (filter === 'archived') {
  //     return this.tasks.filter(task => task.archived);
  //   } else {
  //     return this.tasks.filter(task => !task.archived);
  //   }
  // }
  getTasks(){return[...this.tasks]}

  addTask(title: string,importance: string,dueDate:Date ): void {
    this.tasks.push({ id: this.nextId++, title, completed: false, archived: false,details:'',importance,dueDate });
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  archiveTask(id: number): void {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      //task.archived = true;
      task.archived = !task.archived;
    }
  }

  toggleCompletion(id: number): void {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  unarchiveTask(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.archived = false;
    }
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
    }
  }
}
