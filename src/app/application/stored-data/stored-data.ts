import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { HttpRequestService } from "src/app/core/http/http-request.service";

import { apiRoutes } from "../routing/api-routes";
import { StorageService } from "../services/storage.service";
import { STORE_DATA_KEYS } from "./stored-data-keys";

@Injectable({
    providedIn: 'root'
})
export class StoredDataService {
    constructor(private client: HttpRequestService, private storageService: StorageService) { }
}