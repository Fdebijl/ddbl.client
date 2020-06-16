import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {StorageService, UserService} from '../../../../_services';
import { ToastComponent } from 'src/app/_components/toast/toast.component';

@Component({
  selector: 'app-profile-picture-editor',
  templateUrl: './profile-picture-editor.component.html',
  styleUrls: ['./profile-picture-editor.component.scss']
})
export class ProfilePictureEditorComponent implements OnInit {
  @Output() cancel: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() pfpUpdated: EventEmitter<void> = new EventEmitter<void>();

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

  save(): void {
    if (this.croppedImage !== '') {
      this.userService.uploadProfilePicture(this.croppedImage.toString())
        .then(() => {
          this.pfpUpdated.emit();
        })
        .catch((error) => {
          ToastComponent.getInstance().error(error.error || error);
        })
    }
  }

  reset(): void {
    this.imageChangedEvent = null;
    this.croppedImage = '';
  }
}
