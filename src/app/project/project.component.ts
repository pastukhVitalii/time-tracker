import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {IProject} from "../../data";
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../shared/services/project.service";
import {ModalService} from "../shared/services/modal.service";
import {Subscription} from "rxjs";

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

  @ViewChild('modal', {read: ViewContainerRef})
  entry!: ViewContainerRef;
  sub!: Subscription;

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
    this.isShowTasks = !this.isShowTasks;
    this.projectId = this.project?.id;
    this.isProjectMenu = false;
  }

  toggleMenu() {
    this.isProjectMenu = !this.isProjectMenu
    this.isShowTasks = false;
    this.projectId = this.project?.id;
  }

  deleteProjectHandler(id: string | undefined) {
    this.deleteProject.emit(id);
  }

  updateProjectHandler(props: any) {
    this.editProject.emit({...props, projectName: this.projectName});
  }

  createTaskHandler(props: any) {
    this.createTask.emit({...props, taskName: this.taskName});
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}

