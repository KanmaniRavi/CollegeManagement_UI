import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { ServiceService } from '../../services/service.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private services: ServiceService ) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err) =>{
      if(err.status === 401){
        this.services.Logout();
      }
      return throwError(err);
    })
    );
  }
}
