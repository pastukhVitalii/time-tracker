import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../shared/services/auth.service";
import {IUserRes} from "../../data";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['../shared/style/register-login.css']
})

export class RegisterPageComponent implements OnInit {

  admins: IUserRes | undefined
  errorMessage: string = ""

  subscriptions: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private registerService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerService.getAdmins()
      .subscribe((res: any) => {
          this.admins = res;
          console.log("-> this.admins", this.admins);

        }
      );
  }

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,8}$')
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  onSubmit() {
    this.registerService.register(this.registerForm.value)
      .subscribe((res: IUserRes) => {
          if (res.id) {
            this.router.navigate(['/']);
            this.registerForm.reset()
          } else console.log(res)
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
