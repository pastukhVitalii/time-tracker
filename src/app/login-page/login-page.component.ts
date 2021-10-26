import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RegisterService} from "../shared/services/register.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUserRes} from "../../data";

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
    private registerService: RegisterService,
    private router: Router
  ) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,8}$')
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  onSubmit() {
    console.log("-> sub");
    this.registerService.login(this.loginForm.value)
      .subscribe((res: IUserRes) => {
        console.log("-> res", res);
          if (res) {
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
