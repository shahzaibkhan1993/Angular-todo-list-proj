import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items1: MenuItem[];
  activeItem: MenuItem;

  constructor(private router: Router) {}

  title = 'mytodo-app';

  ngOnInit() {
    this.items1 = [
      { label: 'My Task', icon: 'fa fa-fw fa-bar-chart', command: () => this.router.navigate(['todo-list']) },
      { label: 'Assign Task', icon: 'fa fa-fw fa-calendar', command: () => this.router.navigate(['assign-task']) },
      { label: 'Comments/Correspondence', icon: 'fa fa-fw fa-calendar', command: () => this.router.navigate(['correspondence']) }
    ];

    this.activeItem = this.items1[0]; // Set default active item
  }

  onTabClick(event) {
    this.activeItem = event.item;
  }

}
