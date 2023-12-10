import { AppBaseModel } from "./app-base-model";

export class Addresse extends AppBaseModel {
    public location!: string;
    public country_id!: number;
    public city_id!: number;
}