import { Component, OnInit } from '@angular/core';
import {Metadata} from '../../_domain/metadata';
import {MongodbService} from '../../_services/mongodb.service';
import {Meta} from '@angular/platform-browser';

declare function mp1(zoomLev, lat, lon);
declare function mp2(zoomLev, lat, lon);
declare function mp3(zoomLev, lat, lon);
declare function mp4(zoomLev, lat, lon);
declare function ln1();


@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: [
    './main-dashboard.component.scss',
  ]
})
export class MainDashboardComponent implements OnInit {

  constructor(private newService: MongodbService, ) { }

  public showData: Array<Metadata>;
  public allData: Array<Metadata>;

  public filterInput: string;
  public filterCategory = '';
  public filterType = '';
  public filterAgeGroup = '';

  private loadMaps() {
    mp1(11, 51.46, 5.450);
    mp2(11, 51.46, 5.450);
    mp3(11, 51.46, 5.450);
    mp4(11, 51.46, 5.450);
    // mp5(11, 51.46, 5.450);
    ln1();
  }

  ngOnInit(): void {
    this.newService.GetMetadata().then(data => {this.allData = data; this.showData = data});
    this.loadMaps();
  }

  public saveObjForVisualizationPage(id: string) {
    const obj = this.allData.find(x => x.id === id);
    localStorage.setItem('visData', JSON.stringify(obj));
  }

  public filterCards() {
    const cardList = [];
    const input = this.filterInput;
    const cat = this.filterCategory;
    const type = this.filterType;
    const ageGroup = this.filterAgeGroup;
    console.log('input: ' + input);
    console.log('cat: ' + cat);
    console.log('type: ' + type);
    console.log('ageGroup: ' + ageGroup);
    let i = 0;
    for (const data of this.allData) {
      console.log(i++);
      console.log(data.category);
      console.log(data.type);
      console.log(data.ageGroup);
      // TODO make separate functions
      if ((data.category === cat || cat === '') && (data.type === type || type === '') && (data.ageGroup === ageGroup || ageGroup === '')
        && (input === '' || input === undefined || data.title.includes(input))) {
        cardList.push(data);
      }
    }
    this.showData = cardList;
    console.log('items: ' + this.showData.length);
  }

}
