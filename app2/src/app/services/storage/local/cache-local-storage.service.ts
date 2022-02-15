import { Injectable } from '@angular/core';


/**
 * Service for storing data in local storage
 */
@Injectable({
  providedIn: 'root'
})
export class CacheLocalStorage {

    public getItem(key: string) {
        let value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    public setItem(key: string, value: any) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    }

    public removeItem(key: string) {
        localStorage.removeItem(key);
    }

    public clear() {
        localStorage.clear();
    }
    public isEnabled() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    }
}
