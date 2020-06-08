import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {StorageService, UserService} from '../../../../_services';

@Component({
  selector: 'app-profile-picture-editor',
  templateUrl: './profile-picture-editor.component.html',
  styleUrls: ['./profile-picture-editor.component.scss']
})
export class ProfilePictureEditorComponent implements OnInit {
  @Output() cancel: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  imageChangedEvent: Event;
  croppedImage = '';

  constructor(private storageService: StorageService, private userService: UserService) {
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
      this.userService.uploadProfilePicture(this.croppedImage.toString()).catch( i => window.alert('An error occured while saving the picture.')).then(i => this.reloadPage());
      const storedUser = this.storageService.user.getValue();
      storedUser.profilePicture = this.croppedImage;
      this.storageService.user.next(storedUser);
      // window.location.reload();
    }
  }

  reloadPage(): void {
    window.location.reload();
}

  reset(): void {
    this.imageChangedEvent = null;
    this.croppedImage = '';
  }
}
