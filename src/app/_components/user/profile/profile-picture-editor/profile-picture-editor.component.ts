import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {StorageService} from '../../../../_services';

@Component({
  selector: 'app-profile-picture-editor',
  templateUrl: './profile-picture-editor.component.html',
  styleUrls: ['./profile-picture-editor.component.scss']
})
export class ProfilePictureEditorComponent implements OnInit {
  @Output() cancel: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  imageChangedEvent: Event;
  croppedImage = '';

  constructor(private storageService: StorageService) {
    return
  }

  ngOnInit(): void {
    return
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  imageLoaded(): void {
    // show cropper
  }

  cropperReady(): void {
    // cropper ready
  }

  loadImageFailed(): void {
    // show message
  }

  save(): void {
    if (this.croppedImage !== '') {
      const storedUser = this.storageService.user.getValue();
      storedUser.profilePicture = this.croppedImage;
      this.storageService.user.next(storedUser);
    }
  }

  reset(): void {
    this.imageChangedEvent = null;
    this.croppedImage = '';
  }
}
