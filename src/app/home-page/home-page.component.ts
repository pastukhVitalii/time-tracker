import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../shared/services/project.service";
import {IProject} from "../../data";
import {ModalService} from "../shared/services/modal.service";
import {Subscription} from "rxjs";
import {TaskService} from "../shared/services/task.service";

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {

  projects: Array<IProject> = [];
  projectName: string = "";

  @ViewChild('modal', {read: ViewContainerRef})
  entry!: ViewContainerRef;
  sub!: Subscription;

  constructor(
    private http: HttpClient,
    private projectService: ProjectService,
    private taskService: TaskService,
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.projectService.getProjects()
      .subscribe((res: Array<IProject>) => {
          this.projects = res;
        }
      );
  }

  onAddProject(id: string) {
    this.projectService.addProject(this.projectName)
      .subscribe((res: IProject) => {
          if (res) {
            this.projects?.push(res)
            this.closeModal(id)
          }
        },
        (err) => {
          console.error(err.error.text);
        })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onDeleteProject(id: string) {
    this.projectService.deleteProject(id)
      .subscribe((res: { deleted: boolean }) => {
          if (res.deleted) {
            this.closeModal('delete-project-modal')
            this.projects = this.projects.filter((p) => {
              return p.id !== id;
            });
          }
        },
        (err) => {
          console.error(err.error.message);
        })
  }

  onEditProject(props: any) {
    console.log("-> props", props);
    this.projectService.updateProject(props.projectId, props.projectName)
      .subscribe((res: { updated: boolean }) => {
          if (res.updated) {
            this.projectService.getProjects()
              .subscribe((res: Array<IProject>) => {
                this.projects = res;
              });
            this.closeModal('edit-project-modal')
          }
        },
        (err) => {
          console.error(err.error.message);
        })
  }

  onCreateTask(props: any) {
    this.taskService.createTask(props.projectId, props.taskName)
      .subscribe((res: { updated: boolean }) => {
          this.closeModal('create-task-modal')
        },
        (err) => {
          console.error(err.error.message);
        })
  }
}
