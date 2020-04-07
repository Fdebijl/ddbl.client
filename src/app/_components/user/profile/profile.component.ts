import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_services';
import { User } from 'src/app/_domain';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private id: string;
  user: User;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.data.showSelf) {
      this.user = this.storageService.user.getValue();
      this.storageService.user.subscribe({
        next: user => this.user = user
      })

      return;
    }

    this.id = this.activatedRoute.snapshot.params['id'];
    this.user = this.userService.getByID(this.id);
  }
}
