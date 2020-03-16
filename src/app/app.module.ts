import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, LoginComponent, RegisterComponent } from './_components';
import { FooterComponent } from './_components/partials/footer/footer.component';
import { HeaderComponent } from './_components/partials/header/header.component';
import { MainDashboardComponent } from './_components/main-dashboard/main-dashboard.component';
import { CardVisualisationComponent } from './_components/card-visualisation/card-visualisation.component';
import { CardGenericComponent } from './_components/card-generic/card-generic.component';
import { FooterComponent, HeaderComponent } from './_components/partials';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainDashboardComponent,
    CardVisualisationComponent,
    CardGenericComponent,
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
