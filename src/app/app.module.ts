import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TestComponent} from '../test/test.component';
import {HomePageComponent} from './home-page/home-page.component';
import {HeaderComponent} from './header/header.component';
import {ProjectComponent} from './project/project.component';
import {TaskComponent} from './task/task.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginPageComponent} from './login-page/login-page.component';
import {UniversalAppInterceptor} from "./shared/services/appInterceptor";
import {UserCardComponent} from './user-card/user-card.component';
import { ModalModule } from './modal/modal.module';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HomePageComponent,
    HeaderComponent,
    ProjectComponent,
    TaskComponent,
    RegisterPageComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    UserCardComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
