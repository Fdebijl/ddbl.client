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
import { DatalistitemComponent } from './_components/partials/datalistitem/datalistitem.component';
import { OneComponent } from './_components/user/register/steps/one/one.component';
import { TwoComponent } from './_components/user/register/steps/two/two.component';
import { TermsComponent } from './_components/terms/terms.component';
import { ProfilePictureEditorComponent } from './_components/user/profile/profile-picture-editor/profile-picture-editor.component';
import {ImageCropperModule} from 'ngx-image-cropper';

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
    DatalistitemComponent,
    OneComponent,
    TwoComponent,
    TermsComponent,
    ProfilePictureEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule
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
