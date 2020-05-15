import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent, ImageCropperModule} from 'ngx-image-cropper';
import {StorageService} from '../../../../_services';

@Component({
  selector: 'app-profile-picture-editor',
  templateUrl: './profile-picture-editor.component.html',
  styleUrls: ['./profile-picture-editor.component.scss']
})
export class ProfilePictureEditorComponent implements OnInit {
  @Output() cancel: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  imageChangedEvent = '';
  croppedImage = '';

  constructor(private storageService: StorageService) {
    return
  }

  ngOnInit(): void {
    return
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    return
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    return
  }
  imageLoaded() {
    // show cropper
    return
  }
  cropperReady() {
    // cropper ready
    return
  }
  loadImageFailed() {
    // show message
    return
  }

  save() {
    if (this.croppedImage !== '') {
      const storedUser = this.storageService.user.getValue();
      storedUser.profilePicture = this.croppedImage;
      this.storageService.user.next(storedUser);
    }
    return
  }

  reset() {
    this.imageChangedEvent = '';
    this.croppedImage = '';
    return
  }
}
