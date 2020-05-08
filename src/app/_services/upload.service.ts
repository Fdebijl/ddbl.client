import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ajaxPost } from 'rxjs/internal/observable/dom/AjaxObservable';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // Post metadata from the form
  public async postFormMetadata(
    dataTitle: string,
    dataYear: string,
    dataDesc: string,
    dataAgeGroup: string,
    dataCateg: string,
    dataType: string,
    dataFormat: string,
    dataSource: string,
    dataLink: string,
    dataAccess: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      ajaxPost(`${environment.api_url}/upload`, {
        dataTitle,
        dataYear,
        dataDesc,
        dataAgeGroup,
        dataCateg,
        dataType,
        dataFormat,
        dataSource,
        dataLink,
        dataAccess
      }, {
        'Content-Type': 'application/json'
      }).subscribe({
        error: () => {
          reject();
        },
        next: () => {
          resolve();
        }
      });
    });
  }
}
