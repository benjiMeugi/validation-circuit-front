import { _isDefined } from "src/app/core/util/type-utils";

// interface IPaginateResponse {
//     data: Type[];
//     total: number;
//     from: number;
//     to: number;
//     per_page: number;
//     current_page: number;
//     last_page: number;
// }

export class PaginateResponse {
    data: any[] = [];
    total: number = 0;
    from!: number;
    to!: number;
    per_page!: number;
    current_page!: number;
    last_page!: number;

    constructor(model: any) {
    }
    // createInstance<T>(bluePrint: new () => T) {
    //     this.data = this.data as T[];
    //     let instance = new PaginateResponse()
    //     instance.data = instance.data as T[];
    //     return instance;
    // }
}

interface ILoginData {
    authenticated: boolean;
    double_auth_enabled: boolean;
    token: string;
}

export interface ILoginResponse {
    user: any;
    login_response: ILoginData;
}

export interface IDefaultResponse {
    success: boolean;
    code: number;
    body: IDefaultResponseBody
}

interface IDefaultResponseBody {
    error_message: string;
    errors: string[];
    response_data: any | PaginateResponse | ILoginResponse;
}


export const _response = {
    getResponseData: (param: IDefaultResponse) => {
        return param.body.response_data;
    },
    getResponseState: (param: IDefaultResponse): boolean => {
        return param.success;
    },
    getResponseCode: (param: IDefaultResponse): number => {
        return param.code;
    },
    getResponseAuthState: (param: IDefaultResponse): boolean|null => {
        return (param.body.response_data as ILoginResponse).login_response != undefined ?
        (param.body.response_data as ILoginResponse).login_response.authenticated :
        null;
    }
};
