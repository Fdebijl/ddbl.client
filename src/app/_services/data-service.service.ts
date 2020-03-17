import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Metadata} from '../_domain/metadata';
import {ajax} from 'rxjs/ajax';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  // TODO Set endpoints
  constructor(private storageService: StorageService) { }

  public async getMainDashboardData(): Promise<Metadata[]> {
    return new Promise((resolve, reject) => {
      const url = new URL(`${environment.api_url}/visualization`);
      ajax({
        url: url.toString(),
        withCredentials: false,
        crossDomain: true,
        method: 'GET'
      }).subscribe({
        error: (error) => {
          reject();
        },
        next: data => {
          const metadata = data.response.data;

          resolve(metadata);
        }
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
        error: (error) => {
          reject();
        },
        next: data => {
          // TODO see which data

          resolve('Return json');
        }
      });
    });
  }
}
