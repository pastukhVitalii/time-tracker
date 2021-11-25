import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../shared/services/project.service";
import {IProject} from "../../data";
import {ModalService} from "../shared/services/modal.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {

  projects: Array<IProject> | undefined;
  projectName: string = ""
  bodyText: string = "";

  @ViewChild('modal', {read: ViewContainerRef})
  entry!: ViewContainerRef;
  sub!: Subscription;

  constructor(
    private http: HttpClient,
    private projectService: ProjectService,
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
}
