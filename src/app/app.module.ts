import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDashboardComponent, UploadComponent, RegisterComponent, ProfileComponent, LoginComponent, CardGenericComponent, ErrorComponent, CardVisualisationComponent } from './_components';
import { FooterComponent, HeaderComponent } from './_components/partials';
import { ErrorComponent } from './_components/error/error.component';
import { LoginComponent } from './_components/user/login/login.component';
import { ProfileComponent } from './_components/user/profile/profile.component';
import { SuccessComponent } from './_components/user/success/success.component';
import { VisComponentComponent } from './_components/vis-component/vis-component.component';
import {MongodbService} from './_services/mongodb.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainDashboardComponent,
    CardVisualisationComponent,
    CardGenericComponent,
    ErrorComponent,
    LoginComponent,
    ProfileComponent,
    UploadComponent,
    RegisterComponent,
    SuccessComponent,
    VisComponentComponent,
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
