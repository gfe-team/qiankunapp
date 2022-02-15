import { Injectable } from '@angular/core';
/**
 * Service for storing data in local storage
 */
@Injectable({
  providedIn: 'root'
})
export class CacheMemoryStorage {

    private _data: { [key: string]: any } = {};

    public getItem(key: string) {
        return this._data[key] ? this._data[key] : null;
    }

    public setItem(key: string, value: any) {
        this._data[key] = value;
        return true;
    }

    public removeItem(key: string) {
        delete this._data[key];
    }

    public clear() {
        this._data = [];
    }

    public isEnabled() {
        return true;
    }
}
