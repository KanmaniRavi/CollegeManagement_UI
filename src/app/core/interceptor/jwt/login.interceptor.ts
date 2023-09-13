import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceService } from '../../services/service.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private services : ServiceService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.services.getToken();
    if(token){
      request = request.clone({
        setHeaders : {
          'Authorization' : `BslogiKey ${token}`
        }
      })
    }
    if(request.url.includes('http://101.53.155.156:8087/api/feescollection/search') || request.url.includes('http://101.53.155.156:8087/api/feesHistory/search') || request.url.includes('http://101.53.155.156:8087/api/student/Filter')){
      request = request.clone({
        setHeaders : {
          'Content-Type' : `application/json`
        }
      })
    }
    return next.handle(request);
  }
}
