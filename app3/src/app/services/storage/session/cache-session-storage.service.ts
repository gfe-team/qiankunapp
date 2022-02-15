import { Injectable } from '@angular/core';
/**
 * Service for storing data in session storage
 */
@Injectable({
  providedIn: 'root'
})
export class CacheSessionStorage {

    public getItem(key: string) {
        let value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    public setItem(key: string, value: any) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    }

    public removeItem(key: string) {
        sessionStorage.removeItem(key);
    }

    public clear() {
        sessionStorage.clear();
    }

    public isEnabled() {
        try {
            sessionStorage.setItem('test', 'test');
            sessionStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    }
}
