import { Component, OnInit } from '@angular/core';
import {DataSet, User} from '../../_domain/class';
import {MongodbService, UserService} from '../../_services';
import moment from 'moment';
import {DataService} from '../../_services/data.service';
import {mockdataset} from '../../../assets/datasets/mockdataset';

declare function mpOverlay(baseMapId, overlayContId, Base, zoomLev, lat, lon);

@Component({
  selector: 'app-vis-component',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.scss']
})
export class VisComponent implements OnInit {

  constructor(private userService: UserService) { }

  public contributor: User;
  public dateTimePosted: string;
  public dataSet: DataSet;
  public latitude: number;
  public longitude: number;
  public geoJson;


  ngOnInit(): void {
    this.dataSet = JSON.parse(localStorage.getItem('visData'));
    // this.dataSet = mockdataset;
    this.userService.getByID(this.dataSet.metaData.contributorId).then((user) => {
      console.log(user);
      this.contributor = new User(user);
    }).catch();
    this.dateTimePosted = moment(this.dataSet.metaData.createdAt).format('ll');

    setTimeout(() => {
      // this.processData(this.dataService.getMainDashboardData());
    }, 1000);

    this.latitude = 51.445;
    this.longitude = 5.450;
    this.geoJson = this.dataSet.data;

    /*
    this.newService.GetMetadataVis().then(data => {
      console.log(data);
      this.processData(data as SetMeta[]);
    });
     */
  }
}
