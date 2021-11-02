import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUserRes} from "../../data";
import {AuthService} from "../shared/services/auth.service";
import {LocalStorageService} from "../shared/services/localStorage.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../shared/style/register-login.css']
})
export class LoginPageComponent {

  errorMessage: string = ""

  subscriptions: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private registerService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,8}$')
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  onSubmit() {
    this.registerService.login(this.loginForm.value)
      .subscribe((res: any) => {
          if (res) {
            this.localStorageService.set('t', res.token)
            this.router.navigate(['/']);
            this.loginForm.reset()
          }
        },
        (err) => {
          this.errorMessage = err.error.text
          console.error(err.error.text);
        })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
