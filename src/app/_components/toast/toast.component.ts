import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  private static instance: ToastrService;

  static getInstance(): ToastrService {
    return ToastComponent.instance;
  }

  constructor(private toastrService: ToastrService) {
    ToastComponent.instance = toastrService;
  }

  ngOnInit(): void {
    return;
  }
}
