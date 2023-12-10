import { Injectable } from "@angular/core";
import { IStorageKey } from "../stored-data/stored-data-keys";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    store(data: any, key: IStorageKey) {
        if (key.type === "object" || key.type === "array") {
            data = JSON.stringify(data);
        }
        localStorage.setItem(key.key, data);
    }

    get(key: IStorageKey) {
        const data = localStorage.getItem(key.key) || '';
        if (key.type === "object" || key.type === "array") {
            return JSON.parse(data);
        }
        return data;
    }
}