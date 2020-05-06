import { Component, OnInit, Input } from '@angular/core';
import { SetMeta } from '../../_domain/class';
import moment from 'moment';

declare function mp1(zoomLev, lat, lon);
declare function mp2(zoomLev, lat, lon);
declare function mp3(zoomLev, lat, lon);
declare function mp4(zoomLev, lat, lon);
declare function ln1();

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  constructor() {
    return;
  }

  @Input() cardData: SetMeta;
  public dateTimePosted: string;
  public infoSelectAria: string;
  public cardInfoAria: string;
  public legendHiddenAria: string;

  public saveObjForVisualizationPage(): void {
    localStorage.setItem('visData', JSON.stringify(this.cardData));
  }

  public updateAriaSelected(): void {
      if (this.infoSelectAria === 'true') {
        this.infoSelectAria = 'false';
        this.cardInfoAria = 'true';
        this.legendHiddenAria = 'false';
      } else {
        this.infoSelectAria = 'true';
        this.cardInfoAria = 'false';
        this.legendHiddenAria = 'true';
      }
      console.log('Update aria');
  }

  public getVisualizationTypeForClass(): string {
    if (this.cardData.type === 'Visualization') {
      return 'visualization';
    } else {
      return null;
    }
  }

  private initForVisualization(): void {
    this.cardInfoAria = 'true';
    this.infoSelectAria = 'false';
    switch (this.cardData.file) {
      case 'mp1':
        mp1(11, 51.46, 5.450);
        break;
      case 'mp2':
        mp2(11, 51.46, 5.450);
        break;
      case 'mp3':
        mp3(11, 51.46, 5.450);
        break;
      case 'mp4':
        mp4(11, 51.46, 5.450);
        break;
      case 'mp5':
        // mp5(11, 51.46, 5.450);
        break;
      case 'ln1':
        ln1();
        break;
    }
  }

  public getIcon(): string {
    switch (this.cardData.type) {
      case 'Visualization': {
        return 'fa-eye';
        break;
      }
      case 'Image/Graphic':
      case 'Web Page':
      case 'link': {
        return 'fa-link';
        break;
      }
      default: {
        return 'fa-database';
        break;
      }
    }
  }

  ngOnInit(): void {
    this.dateTimePosted = moment(this.cardData.created).format('ll');
    this.cardInfoAria = 'false';
    this.infoSelectAria = 'true';
    this.legendHiddenAria = 'false';
    if (this.cardData.type === 'Visualization') {
      this.initForVisualization();
    }
  }

}
