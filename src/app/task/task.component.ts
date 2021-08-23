import {Component, OnInit} from '@angular/core';
import {tasks} from 'src/data';

@Component({
  selector: 'app-tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  tasks = tasks;
}
