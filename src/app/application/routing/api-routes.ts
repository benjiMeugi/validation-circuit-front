import { environment } from "src/environments/environment";

export const apiRoutes = {

    login: environment.APP_SERVER_URL + 'login',
    logout: environment.APP_SERVER_URL + 'logout',
    user: environment.APP_SERVER_URL + 'user',
    data: environment.APP_SERVER_URL + 'data',
    file: environment.APP_SERVER_URL + 'data/file',
    notification: environment.APP_SERVER_URL + 'notification',

};