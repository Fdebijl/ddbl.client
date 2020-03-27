import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_domain';
import { StorageService } from 'src/app/_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.user = this.storageService.user.getValue();
    this.storageService.user.subscribe({
      next: user => this.user = user
    })
  }

}
