import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import {DataSet, GenericError} from '../_domain/class';
import {AuthorizedFetch} from '../_util/AuthorizedFetch';
import { Endpoints } from '../_domain/enum/Endpoint';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // TODO Set endpoints
  constructor(private storageService: StorageService) { }

  public async getMainDashboardData(): Promise<DataSet[]> {
    return new Promise((resolve, reject) => {
      AuthorizedFetch(`article/`).
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

  public getDataSet(id: string): Promise<DataSet> {
    return new Promise((resolve, reject) => {
      AuthorizedFetch(`article/${id}`, {
        method: 'GET'
      }).
      then()
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data);
            reject();
            return;
          }
          resolve(data);
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
