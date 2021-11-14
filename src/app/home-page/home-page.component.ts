import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../shared/services/project.service";
import {IProject} from "../../data";

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {

  projects: Array<IProject> | undefined;
  constructor(
    private http: HttpClient,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit(): void {
    this.projectService.getProjects()
      .subscribe((res: Array<IProject>) => {
          this.projects = res;
        }
      );
  }
}
