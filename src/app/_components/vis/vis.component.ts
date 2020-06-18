import { Component, OnInit } from '@angular/core';
import {DataSet, SetMeta, User} from '../../_domain/class';
import {MongodbService, UserService} from '../../_services';
import moment from 'moment';
import {DataService} from '../../_services/data.service';
import { AgmCoreModule } from '@agm/core';
import {GeoJSON} from "leaflet";

declare function mpOverlay(baseMapId, overlayContId, Base, zoomLev, lat, lon);

@Component({
  selector: 'app-vis-component',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.scss']
})
export class VisComponent implements OnInit {

  constructor(private newService: MongodbService, private userService: UserService, private dataService: DataService) { }

  public mpNum: DataSet;
  public mp1Num: DataSet;
  public mp2Num: DataSet;
  public mp3Num: DataSet;
  public mp4Num: DataSet;
  public contributor: User;
  public dateTimePosted: string;
  public dataSet: DataSet;
  public latitude: number;
  public longitude: number;
  public geoJson: GeoJSON;

  private splitDataArrayToObjects(data: Array<DataSet>): void {
    console.log(data.length);
    for (let i = 0, len = data.length; i < len; i++) {
      /*
      console.log(data[i].file);
      switch (data[i].file) {
        case 'mp1': {
          console.log('set mp1Num');
          this.mp1Num = data[i];
          break; }
        case 'mp2': {
          console.log('set mp2Num');
          this.mp2Num = data[i];
          break; }
        case 'mp3': {
          console.log('set mp3Num');
          this.mp3Num = data[i];
          break; }
        case 'mp4': {
          console.log('set mp4Num');
          this.mp4Num = data[i];
          break; }
        default: {
          break; }
      }

       */
    }
  }

  private setOverlayContent(): void {
    switch (this.mpNum.id) {
      case this.mp1Num.id: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.mpOverlay('mp1', 'mp1OverlayCont', 'Gray', 12, 51.445, 5.450);
        break;
      }
      case this.mp2Num.id: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.mpOverlay('mp2', 'mp2OverlayCont', 'DarkGray', 12, 51.445, 5.450);
        break;
      }
      case this.mp3Num.id: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.mpOverlay('mp3', 'mp3OverlayCont', 'Gray', 12, 51.445, 5.450);
        break; }
      case this.mp4Num.id: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.mpOverlay('mp4', 'mp4OverlayCont', 'Gray', 12, 51.445, 5.450);
        break; }
      default: {
        break; }
    }
  }
  private processData(data: Array<DataSet>): void {
    this.splitDataArrayToObjects(data);
    this.setOverlayContent();
  }

  ngOnInit(): void {
    this.mpNum = JSON.parse(localStorage.getItem('visData'));
    this.userService.getByID(this.mpNum.metaData.contributorId).then((user) => {
      this.contributor = user;
    }).catch((error) => {});
    this.dateTimePosted = moment(this.mpNum.metaData.createdAt).format('ll');

    setTimeout(() => {
      // this.processData(this.dataService.getMainDashboardData());
    }, 1000);

    this.latitude = 51.445;
    this.longitude = 5.450;
    this.geoJson = JSON.parse(this.dataSet.data);

    /*
    this.newService.GetMetadataVis().then(data => {
      console.log(data);
      this.processData(data as SetMeta[]);
    });
     */
  }
}
