import { Component, OnInit } from '@angular/core';
import {ImageCroppedEvent, ImageCropperModule} from 'ngx-image-cropper';

@Component({
  selector: 'app-profile-picture-editor',
  templateUrl: './profile-picture-editor.component.html',
  styleUrls: ['./profile-picture-editor.component.scss']
})
export class ProfilePictureEditorComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() {
    return
  }

  ngOnInit(): void {
    return
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  save() {

  }

}
