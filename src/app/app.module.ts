import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent } from './_components/partials';
import { ErrorComponent } from './_components/error/error.component';
import { LoginComponent } from './_components/user/login/login.component';
import { ProfileComponent } from './_components/user/profile/profile.component';
import { SuccessComponent } from './_components/user/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    LoginComponent,
    ProfileComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
