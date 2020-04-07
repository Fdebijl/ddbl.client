import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDashboardComponent } from './_components/main-dashboard/main-dashboard.component';
import { FooterComponent, HeaderComponent } from './_components/partials';
import { ErrorComponent } from './_components/error/error.component';
import { LoginComponent } from './_components/user/login/login.component';
import { ProfileComponent } from './_components/user/profile/profile.component';
import { VisComponentComponent } from './_components/vis-component/vis-component.component';
import {MongodbService} from './_services/mongodb.service';
import { CardComponent } from './_components/card/card.component';
import {RegisterComponent, UploadComponent} from './_components';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainDashboardComponent,
    ErrorComponent,
    LoginComponent,
    ProfileComponent,
    VisComponentComponent,
    CardComponent,
    UploadComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    MongodbService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
