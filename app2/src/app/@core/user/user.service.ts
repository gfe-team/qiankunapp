import { CacheLocalStorage } from './../../services/storage';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  protected _user: any;
  protected _key = '__user__';

  constructor(private injector: Injector) { }

  get storage() {

    return this.injector.get(CacheLocalStorage);
  }

  read() {
    if (!this._user) {
      this._user = this.storage.getItem(this._key)
    }
    this._user = this._user || '';

    return this._user;
  }

  write(_user: Object): Boolean {
    this._user = _user || '';
    if (this._user && this._user.avatar) {
      this._user.avatar = '' + this._user.avatar;
    }
    this.storage.setItem(this._key, this._user);
    return true;
  }

  destory() {

    this._user = '';
    this.storage.removeItem(this._key);
  }
}
