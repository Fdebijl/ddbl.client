import { Injectable } from '@angular/core';
import { User, StoredBehaviorSubject } from '../_domain/class';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public user: StoredBehaviorSubject<User> = new StoredBehaviorSubject<User>('user');
}
