import {Component, Input, OnInit} from '@angular/core';
import {IProject} from "../../data";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  isShowTasks = false;

  @Input() project: IProject | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  showTasks() {
    this.isShowTasks = !this.isShowTasks;
  }
}

