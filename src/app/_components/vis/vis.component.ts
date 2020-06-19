import { Component, OnInit } from '@angular/core';
import {DataSet, User} from '../../_domain/class';
import {UserService} from '../../_services';
import moment from 'moment';
import {DataService} from '../../_services/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vis-component',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.scss']
})
export class VisComponent implements OnInit {

  constructor(private userService: UserService, private dataService: DataService, private route: ActivatedRoute) { }

  public contributor: User;
  public dateTimePosted: string;
  public dataSet: DataSet;
  public geoJson;


  ngOnInit(): void {
    this.geoJson = [];
    this.route.params.subscribe(params => {
      this.dataService.getDataSet(params.id).then( dataSet => {
        this.dataSet = dataSet;
        if (typeof(dataSet.data) !== 'object') {
          this.geoJson = JSON.parse(dataSet.data);
        }
        this.userService.getByID(this.dataSet.metaData.contributorId).then((user) => {
          console.log(user);
          this.contributor = new User(user);
        }).catch();
        this.dateTimePosted = moment(this.dataSet.metaData.createdAt).format('ll');
      });
    });
  }
}
