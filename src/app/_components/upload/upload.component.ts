import { Component, OnInit } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const UIkit: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor() {
    return;
  }

  ngOnInit(): void {
    this.initDatasetUploader()
    this.initThumbnailUploader();
    return;
  }

  // TODO: Upload logic
  private initThumbnailUploader(): void {
    UIkit.upload('.thumbnail-upload', {
      url: '',
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
