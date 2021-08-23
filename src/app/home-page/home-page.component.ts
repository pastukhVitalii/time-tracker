import {Component} from '@angular/core';
import {projects} from 'src/data';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {

  projects = projects;
}
