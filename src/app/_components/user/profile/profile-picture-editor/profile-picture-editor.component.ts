import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent, ImageCropperModule} from 'ngx-image-cropper';
import {User} from '../../../../_domain/class';
import {StorageService} from '../../../../_services';

@Component({
  selector: 'app-profile-picture-editor',
  templateUrl: './profile-picture-editor.component.html',
  styleUrls: ['./profile-picture-editor.component.scss']
})
export class ProfilePictureEditorComponent implements OnInit {
  @Output() cancel: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private storageService: StorageService) {
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
    if (this.croppedImage !== '') {
      const storedUser = this.storageService.user.getValue();
      storedUser.profilePicture = this.croppedImage;
      this.storageService.user.next(storedUser);
    }
  }

  reset() {
    this.imageChangedEvent = '';
    this.croppedImage = '';
  }

}
