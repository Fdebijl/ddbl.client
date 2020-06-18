import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {ajax} from 'rxjs/ajax';
import { StorageService } from './storage.service';
import {DataSet, GenericError, User} from '../_domain/class';
import {AuthorizedFetch} from '../_util/AuthorizedFetch';
import { Endpoints } from '../_domain/enum/Endpoint';
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // TODO Set endpoints
  constructor(private storageService: StorageService) { }

  public async getMainDashboardData(): Promise<DataSet[]> {
    return new Promise((resolve, reject) => {
      AuthorizedFetch(`/article/`).
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

  public async create(dataSet: DataSet): Promise<string> {
    return new Promise((resolve, reject) => {
      AuthorizedFetch(Endpoints.dataset, {
        method: 'POST',
        body: JSON.stringify({
          data: dataSet.data,
          metaData: dataSet.metaData
        })
      })
        .then((response) => response.json())
        .then(async (data) => {
          resolve(data.id);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public async uploadThumbnail(fd: FormData, dataSetId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      AuthorizedFetch(`thumbnails/upload/${dataSetId}`, {
        method: 'POST',
        body: fd
      }, {
        useDefaults: false
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            reject(data.error as GenericError);
            return;
          }

          resolve(data.path || '');
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}
