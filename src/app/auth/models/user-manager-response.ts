export class UserManagerResponse {
    message:string;
    isSuccess:boolean;
    expire?:Date;
    errors:Array<string>;
}