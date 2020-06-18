import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {AuthenticationService, StorageService} from '../../_services';
import { environment } from 'src/environments/environment';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const UIkit: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private storageService: StorageService) {
    return;
  }

  ngOnInit(): void {
    this.initDatasetUploader()
    this.initThumbnailUploader();

    this.uploadForm = this.formBuilder.group({
      dataTitle: ['', Validators.required],
      dataYear: ['', Validators.required],
      dataDesc: ['', Validators.required],
      dataAgeGroup: ['', Validators.required],
      dataCateg: ['', Validators.required],
      dataType: ['', Validators.required],
      dataFormat: ['', Validators.required],
      dataSource: ['', Validators.required],
      dataLink: ['', Validators.required],
      dataAccess: ['', Validators.required]
    });

    (window as any).f = this.f;
    return;
  }

  onSubmit(): void {
    return;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.uploadForm.controls;
  }


  private initThumbnailUploader(): void {
    UIkit.upload('.thumbnail-upload', {
      url: environment.api_url,
      multiple: false,
      mime: 'image/*',

      beforeSend: function () {
        console.log('beforeSend', arguments);
      },
      beforeAll: function () {
        console.log('beforeAll', arguments);
      },
      load: function () {
        console.log('load', arguments);
      },
      error: function () {
        console.log('error', arguments);
      },
      complete: function () {
        console.log('complete', arguments);
      },

      loadStart: function (e) {
        console.log('loadStart', arguments);
      },

      progress: function (e) {
        console.log('progress', arguments);
      },

      loadEnd: function (e) {
        console.log('loadEnd', arguments);
      },

      completeAll: function () {
        console.log('completeAll', arguments);
      }
    });
  }

  private initDatasetUploader(): void {
    UIkit.upload('.dataset-upload', {
      url: '',
      multiple: false,
      allow: '*.json',

      beforeSend: function () {
        console.log('beforeSend', arguments);
      },

      beforeAll: function () {
        console.log('beforeAll', arguments);
      },
      load: function () {
        console.log('load', arguments);
      },

      error: function () {
        console.log('error', arguments);
      },
      complete: function () {
        console.log('complete', arguments);
      },

      loadStart: function (e) {
        console.log('loadStart', arguments);
      },

      progress: function (e) {
        console.log('progress', arguments);
      },

      loadEnd: function (e) {
        console.log('loadEnd', arguments);
      },

      completeAll: function () {
        console.log('completeAll', arguments);
      }

    });
  }
}
