import { Component, OnInit } from '@angular/core';
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

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService) { }

  async ngOnInit(): Promise<void> {
    if (this.activatedRoute.snapshot.data.showSelf) {
      this.user = this.storageService.user.getValue();
      this.storageService.user.subscribe({
        next: user => this.user = user
      })

      return;
    }

    this.id = this.activatedRoute.snapshot.params['id'];
    this.user = await this.userService.getByID(this.id);
  }
}
