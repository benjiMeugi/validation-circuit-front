import { AppBaseModel } from "./app-base-model";
import { DataType } from "./data-type";
import { Validator } from "./validator";

export class Data extends AppBaseModel {
    public label!: string;
    public description!: string;
    public active!: boolean;
    public user_id!: number;
    public data_type_id!: number;
    public validators!: Validator[];
    public data_type!: DataType;
}