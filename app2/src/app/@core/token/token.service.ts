import { CacheLocalStorage } from './../../services/storage';
import { Injectable, Injector } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  protected _token = '';
  protected _key = '__token__';

  constructor(private injector: Injector) { }

  get storage() {

    return this.injector.get(CacheLocalStorage);
  }

  read() {
    if (!this._token) {
      this._token = this.storage.getItem(this._key)
    }
    this._token = this._token || '';

    return this._token;
  }

  write(token: string): Boolean {
    token = token || '';
    if (token.length > 10) {
      this._token = token;
      this.storage.setItem(this._key, this._token);
    } else {
      this.destory();
      return false
    }
    return true;
  }

  destory() {

    this._token = '';
    this.storage.removeItem(this._key);
  }
}
