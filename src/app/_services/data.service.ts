import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {SetMeta} from '../_domain/class/data/SetMeta';
import {ajax} from 'rxjs/ajax';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // TODO Set endpoints
  constructor(private storageService: StorageService) { }

  public async getMainDashboardData(): Promise<SetMeta[]> {
    return new Promise((resolve, reject) => {
      const url = new URL(`${environment.api_url}/visualization`);
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
        error: () => {
          reject();
        },
        next: data => {
          // TODO see which data
          data.status;
          resolve('Return json');
        }
      });
    });
  }
}
