import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from "../shared/services/localStorage.service";
import {Router} from "@angular/router";
import {IUserRes} from "../../data";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: IUserRes | null = null;

  constructor(
    private router: Router,
    private LocalStorageService: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.router.navigate(['/login'])
    this.LocalStorageService.remove('t')
  }

}
