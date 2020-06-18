import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {SetMeta} from '../_domain/class/data/SetMeta';
import {ajax} from 'rxjs/ajax';
import { StorageService } from './storage.service';
import {DataSet, GenericError, User} from '../_domain/class';
import {AuthorizedFetch} from '../_util/AuthorizedFetch';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // TODO Set endpoints
  constructor(private storageService: StorageService) { }

  public async getMainDashboardData(): Promise<DataSet[]> {
    return new Promise((resolve, reject) => {
      AuthorizedFetch(`dataset/`).
      then()
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data);
            reject([]);
            return;
          }

          console.log(data);
          const dataset = data;
          resolve(dataset);
        });
    });
  }

  private async getVisualization(visId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = new URL(`${environment.api_url}/visualization/${visId}`);
      ajax({
        url: url.toString(),
        withCredentials: false,
        crossDomain: true,
        method: 'GET'
      }).subscribe({
        error: () => {
          reject();
        },
        next: data => {
          // TODO see which data
          // data.status;
          resolve('Return json');
        }
      });
    });
  }
}
