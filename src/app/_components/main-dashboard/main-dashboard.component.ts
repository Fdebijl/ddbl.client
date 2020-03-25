import { Component, OnInit } from '@angular/core';
import {Metadata} from '../../_domain/metadata';
import {MongodbService} from '../../_services/mongodb.service';

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

  public data: Array<Metadata>;

  private loadMaps(){
    mp1(11, 51.46, 5.450);
    mp2(11, 51.46, 5.450);
    mp3(11, 51.46, 5.450);
    mp4(11, 51.46, 5.450);
    // mp5(11, 51.46, 5.450);
    ln1();
  }

  ngOnInit(): void {
    this.newService.GetMetadata().then(data => this.data = data);
    this.loadMaps();
  }

  public saveObjForVisualizationPage(id: string) {
    const obj = this.data.find(x => x.id === id);
    localStorage.setItem('visData', JSON.stringify(obj));
  }

}
