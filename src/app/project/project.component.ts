import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {IProject} from "../../data";
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../shared/services/project.service";
import {ModalService} from "../shared/services/modal.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  isShowTasks = false;
  projectId: string | undefined = '';
  isProjectMenu: boolean = false;
  projectName: string = "";
  taskName: string = "";
  delay: number = 0;
  isPlay: boolean = false;

  @ViewChild('modal', {read: ViewContainerRef})
  entry!: ViewContainerRef;

  @Input() project: IProject | undefined;
  @Input() i = 1;
  @Output() deleteProject = new EventEmitter<string>();
  @Output() editProject = new EventEmitter<any>();
  @Output() createTask = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private projectService: ProjectService,
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  showTasks() {
    if(!this.isPlay) {
      this.isShowTasks = !this.isShowTasks;
      this.projectId = this.project?.id;
      this.isProjectMenu = false;
    }
  }

  openMenu() {
    this.delay = setTimeout(() => {
      this.isProjectMenu = true;
      this.projectId = this.project?.id;
    }, 300)
  }

  closeMenu() {
    this.isProjectMenu = false;
    this.projectId = this.project?.id;
    clearInterval(this.delay)
  }

  deleteProjectHandler(id: string | undefined) {
    this.deleteProject.emit(id);
  }

  updateProjectHandler(props: {projectId: string}) {
    this.editProject.emit({...props, projectName: this.projectName});
  }

  createTaskHandler() {
    this.createTask.emit({projectId: this.projectId, taskName: this.taskName});
    this.taskName = '';
    this.projectId = '';
    this.isProjectMenu = false;
    this.isShowTasks = false;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  isTracking(isPlay: boolean) {
    this.isPlay = isPlay;
  }
}

