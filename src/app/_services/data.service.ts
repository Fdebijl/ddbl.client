import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {ajax} from 'rxjs/ajax';
import { StorageService } from './storage.service';
import {DataSet, GenericError, User} from '../_domain/class';
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

  public async create(): Promise<void> {
    return new Promise((resolve, reject) => {
      AuthorizedFetch(Endpoints.dataset, {
        method: 'POST',
        body: JSON.stringify({
          data: "string",
          metaData: {
            ageGroup: "string",
            category: "string",
            contributorId: "string",
            createdAt: "2020-06-18T09:33:42.928Z",
            credit: "string",
            description: "string",
            linkToSource: "string",
            pathToThumbnail: "string",
            publik: true,
            source: "string",
            title: "string",
            updatedAt: "2020-06-18T09:33:42.929Z",
            year: 0
          }
        })
      })
        .then((response) => response.json())
        .then(async (data) => {
          // data
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}
