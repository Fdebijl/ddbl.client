import { Component, OnInit } from '@angular/core';
import { MongodbService } from '../../_services/mongodb.service';
import {DataService} from '../../_services/data.service';
import {AuthenticationService} from '../../_services';
import {DataSet} from '../../_domain/class';

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

  constructor(private newService: MongodbService, private service: DataService, private authenticationService: AuthenticationService) { }

  public showData: Array<DataSet>;
  public allData: Array<DataSet>;

  public filterInputString: string;
  public filterCategoryString = '';
  public filterTypeString = '';
  public filterAgeGroupString = '';

  private loadMaps(): void {
    mp1(11, 51.46, 5.450);
    mp2(11, 51.46, 5.450);
    mp3(11, 51.46, 5.450);
    mp4(11, 51.46, 5.450);
    // mp5(11, 51.46, 5.450);
    ln1();
  }

  ngOnInit(): void {
    /*
    this.allData = this.newService.GetMetaDataNoAPI() as SetMeta[];
    this.showData = this.allData;
     */
    if (this.authenticationService.isAuthenticated()) {
      this.service.getMainDashboardData().then(data => {
        this.allData = data as DataSet[];
        this.showData = this.allData;
      });
    }
  }

  public saveObjForVisualizationPage(id: string): void {
    const obj = this.allData.find(x => x.id === id);
    localStorage.setItem('visData', JSON.stringify(obj));
  }

  private filterCat(cat: string, data: DataSet): boolean {
    if ((data.metaData.category === cat || cat === '')) {
      return true;
    } else {
      return false;
    }
  }

  private filterInput(input: string, data: DataSet): boolean {
    if (input === '' || input === undefined || data.metaData.title.toLowerCase().includes(input.toLowerCase())) {
      return true;
    } else {
      return false;
      }
    }

  private filterType(type: string, data: DataSet): boolean {
    if ((data.dataType.toString() === type || type === undefined)) {
      return true;
    } else {
      return false;
    }
  }

  private filterAgeGroup(ageGroup: string, data: DataSet): boolean {
      if (data.metaData.ageGroup === ageGroup || ageGroup === '') {
        return true;
      } else {
        return false;
      }
    }

  public filterCards(): void {
    const cardList = [];
    const input = this.filterInputString;
    const cat = this.filterCategoryString;
    const type = this.filterTypeString;
    const ageGroup = this.filterAgeGroupString;
    console.log('input: ' + input);
    console.log('cat: ' + cat);
    console.log('type: ' + type);
    console.log('ageGroup: ' + ageGroup);
    for (const data of this.allData) {
      // TODO make separate functions
      if (this.filterInput(input, data) && this.filterCat(cat, data) && this.filterType(type, data)
        && this.filterAgeGroup(ageGroup, data)) {
        cardList.push(data);
      }
    }
    this.showData = cardList;
    console.log('items: ' + this.showData.length);
  }
}
