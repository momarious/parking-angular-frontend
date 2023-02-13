import { Injectable } from '@angular/core';
import { STORAGE_CONFIG } from 'src/app/config/storage.config';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getLocalUser(): User {
    let usr = localStorage.getItem(STORAGE_CONFIG.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: User) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_CONFIG.localUser);
    } else {
      localStorage.setItem(STORAGE_CONFIG.localUser, JSON.stringify(obj));
    }
  }
}
