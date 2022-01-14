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
  totalTasksTime: number = 0;
  sec: number = 0;
  minutes: number = 0;
  hours: number = 0;
  interval: number = 0;
  @Input() playTaskId: string = '';

  @Input() tasks: Array<ITask> = [];
  @Input() projectId: string | undefined;
  @Output() isTracking = new EventEmitter<any>();

  constructor(
    private taskService: TaskService,
    private http: HttpClient,
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.taskService.getTasks(this.projectId)
      .subscribe((res: Array<ITask>) => {
          this.tasks = res
          this.totalTasksTime = res.reduce(function (sum, b: ITask) {
            return sum + Number(b.time);
          }, 0);
        }
      );
  }

  onDeleteTask(taskId: string) {
    this.taskService.deleteTask(taskId)
      .subscribe((res: { deleted: boolean }) => {
          if (res.deleted) {
            this.closeModal('delete-task-modal-' + taskId)
            this.tasks = this.tasks.filter((p) => {
              return p.id !== taskId;
            });
          }
        },
        (err) => {
          console.error(err.error.message);
        })
  }

  onEditTask(task: ITask) {
    this.taskService.editTask({
      ...task,
      task_name: this.taskName,
      // @ts-ignore
      time: +this.hours * 3600 + +this.minutes * 60 + +task.time
    })
      .subscribe((res: { updated: boolean, task: ITask }) => {
          if (res.updated) {
            const index = this.tasks.findIndex(i => i.id === res.task.id);
            this.tasks[index] = res.task;
          }
        },
        (err) => {
          console.error(err.error.message);
        })
    this.taskName = '';
    this.sec = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  onUpdateTime(task: ITask) {
    this.taskService.updateTaskTime({...task, time: +this.hours * 3600 + +this.minutes * 60 + this.sec + +task.time})
      .subscribe((res: { updated: boolean }) => {
          if (res.updated) {
            this.taskService.getTasks(this.projectId)
              .subscribe((res: Array<ITask>) => {
                  this.tasks = res;
                }
              );
          }
        },
        (err) => {
          console.error(err.error.message);
        })
    this.taskName = '';
    this.sec = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  toggleTimer(task: ITask) {
    this.isPlay = !this.isPlay;
    this.playTaskId = task.id
    if (this.isPlay) {
      this.startTimer()
    } else this.pauseTimer(task)
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.sec++
      if (this.sec === 60) {
        this.sec = 0;
        this.minutes++
      }
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++
      }
    }, 1000)
  }

  pauseTimer(task: ITask) {
    this.onUpdateTime(task);
    clearInterval(this.interval);
    this.sec = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  isTrackingHandler(isPlay: boolean) {
    this.isTracking.emit(isPlay);
  }
}
