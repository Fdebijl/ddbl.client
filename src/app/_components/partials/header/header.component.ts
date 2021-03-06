import { Component, OnInit } from '@angular/core';
import { User } from '../../../_domain/class';
import { StorageService } from 'src/app/_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  showUser: boolean;

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.user = this.storageService.user.getValue();
    this.showUser = !!this.user;
    this.storageService.user.subscribe({
      next: user => {
        this.user = user
        this.showUser = !!this.user;
      }
    })
  }

}
