import { Component, OnInit } from '@angular/core';
import {Metadata} from '../../_domain/metadata';

declare function mpOverlay(baseMapId, overlayContId, Base, zoomLev, lat, lon);

@Component({
  selector: 'app-vis-component',
  templateUrl: './vis-component.component.html',
  styleUrls: ['./vis-component.component.scss']
})
export class VisComponentComponent implements OnInit {

  constructor() { }

  public mpNum: Metadata;
  public mp1Num: Metadata;
  public mp2Num: Metadata;
  public mp3Num: Metadata;
  public mp4Num: Metadata;

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      switch (this.mpNum.id) {
        case this.mp1Num.id:
          mpOverlay ('mp1', 'mp1OverlayCont', 'Gray', 12, 51.445, 5.450);
          break;
        case this.mp2Num.id:
          mpOverlay ('mp2', 'mp2OverlayCont', 'DarkGray', 12, 51.445, 5.450);
          break;
        case this.mp3Num.id:
          mpOverlay ('mp3', 'mp3OverlayCont', 'Gray', 12, 51.445, 5.450);
          break;
        case this.mp4Num.id:
          mpOverlay ('mp4', 'mp4OverlayCont', 'Gray', 12, 51.445, 5.450);
          break;
      }
    });
  }

}
