import {Component, Input, OnInit} from '@angular/core';
import {DataSet, User} from '../../_domain/class';
import moment from 'moment';
import {DataType} from '../../_domain/enum/DataType';
import {UserService} from '../../_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {
    return;
  }

  @Input() dataSet: DataSet;
  public dateTimePosted: string;
  public infoSelectAria: string;
  public cardInfoAria: string;
  public legendHiddenAria: string;
  public contributor: User;
  public hasThumbnail: boolean;

  public saveObjForVisualizationPage(): void {
    this.router.navigate([`visualization/${this.dataSet.id}`])
  }

  public getIcon(): string {
    switch (this.dataSet.dataType) {
      case DataType.VISUALIZATION: {
        return 'fa-eye';
        break;
      }
      case DataType.IMAGEGRAPHIC:
      case DataType.WEBPAGE:
      case DataType.LINK: {
        return 'fa-link';
        break;
      }
      default: {
        return 'fa-database';
        break;
      }
    }
  }

  hasMapVisualizationLink(): boolean {
    return true;
    /*
    if (this.dataSet.dataType === DataType.VISUALIZATION) {
      return true;
    }
    return false;
    */
  }

  public hasAffiliation(): boolean {
    try {
      if (this.contributor && this.contributor.affiliation) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  public isCertainDataType(): boolean {
    if (this.dataSet.dataType === DataType.LINK ||
      this.dataSet.dataType === DataType.WEBPAGE ||
      this.dataSet.dataType === DataType.IMAGEGRAPHIC) {
      return true;
    }
    return false;
  }

  public forceRefreshHasThumbnail(): void {
    const avatarUrl = this.getThumbnailUrl();
    fetch(avatarUrl)
      .then((res) => {
        if (res.status !== 200) {
          this.hasThumbnail = false;
          return;
        }

        this.hasThumbnail = true;
      })
      .catch(() => {
        this.hasThumbnail = false;
      })
  }

  public getThumbnailUrl(): string {
    return 'https://vll.floris.amsterdam/static/thumbnails/' + this.dataSet.id + '.jpeg';
  }

  ngOnInit(): void {
    this.userService.getByID(this.dataSet.metaData.contributorId).then((user) => {
      this.contributor = user;
    }).catch();
    this.hasThumbnail = false;
    this.forceRefreshHasThumbnail();
    this.dateTimePosted = moment(this.dataSet.metaData.createdAt).format('ll');
    this.cardInfoAria = 'false';
    this.infoSelectAria = 'true';
    this.legendHiddenAria = 'false';
  }

}
