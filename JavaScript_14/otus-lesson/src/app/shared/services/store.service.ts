import { Injectable } from "@angular/core";

export const RECENTLY_ADDED_KEY = 'recently-added';
export const SETTINGS_KEY = 'settings';
@Injectable()
export class StoreService {

    store = new Map<string, string>();

    set<T>(key: string, value: T) {
        // this.store.set(key, value);
        localStorage.setItem(key, JSON.stringify(value));
    }

    get<T>(key: string): T | void {
        try {
            const parsedData = JSON.parse(String(localStorage.getItem(key)));
            return parsedData;
        } catch (error: unknown) { 
            console.error(error);
        }
    }

    remove(key: string) {
        const value = this.get(key);
        if (!value) {
            return;
        }

        localStorage.removeItem(key);
    }
}