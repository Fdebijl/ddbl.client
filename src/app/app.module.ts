import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDashboardComponent, UploadComponent, RegisterComponent, ProfileComponent, LoginComponent, ErrorComponent, VisComponent } from './_components';
import { FooterComponent, HeaderComponent } from './_components/partials';
import { MongodbService } from './_services/mongodb.service';
import { CardComponent } from './_components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainDashboardComponent,
    ErrorComponent,
    LoginComponent,
    ProfileComponent,
    CardComponent,
    UploadComponent,
    RegisterComponent,
    VisComponent,
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
