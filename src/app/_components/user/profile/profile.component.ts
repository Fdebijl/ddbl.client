import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_services';
import { User, DataSet } from '../../../_domain/class';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private id: string;
  user: User;
  dataSets: DataSet[] = []; // TODO: Populate datasets from API
  canBeEdited: boolean;
  editMode: boolean;
  displayNameEditMode: string;
  bioEditMode: string;
  affiliationEditMode: string;
  editPfp: boolean;
  @ViewChild('pfpBlockTarget') pfpBlockTarget: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService) {}

  async ngOnInit(): Promise<void> {
    this.canBeEdited = false;
    if (this.activatedRoute.snapshot.data.showSelf) {
      this.user = this.storageService.user.getValue();
      this.storageService.user.subscribe({
        next: user => this.user = user
      });
      this.canBeEdited = true;
    } else {
      this.id = this.activatedRoute.snapshot.params.id;
      this.user = await this.userService.getByID(this.id);
    }

    this.editMode = false;
    this.editPfp = false;
    this.displayNameEditMode = '';
    this.bioEditMode = '';
    this.affiliationEditMode = '';
  }

  public activateEditMode(): void {
    this.editMode = true;
    this.displayNameEditMode = this.user.displayName;
    this.bioEditMode = this.user.bio;
    this.affiliationEditMode = this.user.affiliation;
  }

  public deactivateEditMode(): void {
    this.editMode = false;
    this.displayNameEditMode = '';
    this.bioEditMode = '';
    this.affiliationEditMode = '';
  }

  public onSubmit(): void {
    const u = new User({});
    if (this.user.displayName !== this.displayNameEditMode
      && this.displayNameEditMode !== null
      && this.displayNameEditMode !== undefined
      && this.displayNameEditMode !== '') {
      u.displayName = this.displayNameEditMode;
    }
    if (this.user.affiliation !== this.affiliationEditMode) {
      u.affiliation = this.affiliationEditMode;
    }
    if (this.user.bio !== this.bioEditMode) {
      u.bio = this.bioEditMode;
    }
    this.userService.update(u);
    this.user = this.storageService.user.getValue();
    this.storageService.user.subscribe({
      next: user => this.user = user
    })
    this.deactivateEditMode();
  }

  public deleteAccount(): void {
    this.userService.delete();
    this.router.navigate(['/login'],{queryParams: {action: 'logout'}});
  }

  public updateEditPfp(): void{
    if (this.editPfp) {
      this.editPfp = false;
    } else {
      this.editPfp = true;
    }
  }

  // Gets used by child component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cancel(event: MouseEvent): void {
    this.updateEditPfp();
  }
}
