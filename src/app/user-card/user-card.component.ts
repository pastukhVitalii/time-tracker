import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  name: string | undefined

  isAuth = false

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.me()
      .subscribe((res) => {
        if (res.id) {
          this.name = res.email;
          this.isAuth = true
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/login']);
          console.error(res);
        }
      });
  }

}
