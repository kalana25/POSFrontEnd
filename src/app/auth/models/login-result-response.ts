import { UserDetail } from './user-detail';

export class LoginResultResponse {
    message:string;
    isSuccess:boolean;
    expire?:Date;
    loggedUser:UserDetail;
    errors:Array<string>;
}