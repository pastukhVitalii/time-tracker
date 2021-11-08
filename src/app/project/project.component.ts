import {Component, Input, OnInit} from '@angular/core';
import {IProject} from "../../data";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  isShowTasks = false;
  projectId: string | undefined = '';

  @Input() project: IProject | undefined;
  @Input() i = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  showTasks() {
    this.isShowTasks = !this.isShowTasks;
    this.projectId = this.project?.id;
  }
}

