import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestIntercepterService } from '../services/request-intercepter.service';



export const httpInterceptorProviders =[
    {provide:HTTP_INTERCEPTORS,useClass:RequestIntercepterService,multi:true},
];