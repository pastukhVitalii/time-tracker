import {Component, Input, OnInit} from '@angular/core';
import {ITask} from 'src/data';
import {TaskService} from "../shared/services/task.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  @Input() tasks: Array<ITask> | undefined;
  @Input() projectId: string | undefined;

  constructor(
    private taskService: TaskService
  ) {
  }

  ngOnInit(): void {
    this.taskService.getTasks(this.projectId)
      .subscribe((res: Array<ITask>) => {
          this.tasks = res;
        }
      );
  }
}
