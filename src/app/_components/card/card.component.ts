import { Component, OnInit, Input } from '@angular/core';
import { SetMeta } from '../../_domain/class';
import moment from 'moment';

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
  }

}
