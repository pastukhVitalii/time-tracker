import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../shared/services/project.service";
import {Router} from "@angular/router";
import {IProject, IUserRes} from "../../data";
import {LocalStorageService} from "../shared/services/localStorage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {

  projects: Array<IProject> | undefined;
  subscriptions: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private projectService: ProjectService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.projectService.getProjects()
      .subscribe((res: Array<IProject>) => {
          this.projects = res;
          console.log("-> this.admins", this.projects);
        }
      );
  }
}
