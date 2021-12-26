import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITask} from 'src/data';
import {TaskService} from "../shared/services/task.service";
import {HttpClient} from "@angular/common/http";
import {ModalService} from "../shared/services/modal.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  taskName: string = "";
  isPlay: boolean = false;
  sec: number = 0;
  minutes: number = 0;
  hours: number = 0;
  interval: any;
  @Input() playTaskId: string = '';

  @Input() tasks: Array<ITask> = [];
  @Input() projectId: string | undefined;
  @Input() taskId: string | undefined;

  constructor(
    private taskService: TaskService,
    private http: HttpClient,
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.taskService.getTasks(this.projectId)
      .subscribe((res: Array<ITask>) => {
          this.tasks = res;
        }
      );
  }

  onDeleteTask(taskId: string) {
    this.taskService.deleteTask(taskId)
      .subscribe((res: { deleted: boolean }) => {
          if (res.deleted) {
            this.closeModal('delete-task-modal')
            this.tasks = this.tasks.filter((p) => {
              return p.id !== taskId;
            });
          }
        },
        (err) => {
          console.error(err.error.message);
        })
  }

  onEditTask(taskId: string) {
    this.taskService.editTask(taskId, this.taskName)
      .subscribe((res: { updated: boolean }) => {
          if (res.updated) {
            this.taskService.getTasks(this.projectId)
              .subscribe((res: Array<ITask>) => {
                  this.tasks = res;
                  this.closeModal('edit-task-modal')
                }
              );
          }
        },
        (err) => {
          console.error(err.error.message);
        })
  }

  setTaskId(taskId: string) {
    this.taskId = taskId;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  toggleTimer(taskId: string) {
    this.isPlay = !this.isPlay;
    this.playTaskId = taskId
    if(this.isPlay) {
      this.startTimer()
    } else this.pauseTimer()
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.sec++
      if(this.sec === 60) {
        this.sec = 0;
        this.minutes++
      }
      if(this.minutes === 60) {
        this.minutes = 0;
        this.hours++
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
