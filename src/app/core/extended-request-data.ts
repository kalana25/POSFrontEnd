export class ExtendedRequestData 
{
    page:number;
    pageSize:number;
    columns:string;
    filter:string;
    orderBy:string;
    from?:Date;
    to?:Date;

    constructor() {
        
    }
}