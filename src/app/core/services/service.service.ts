import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = environment.API_URL;
  private loginUrl = this.baseUrl + "auth/login";
  private userDetails = this.baseUrl + "auth/user-details";
  private forgotPsw = this.baseUrl + "auth/send/password";
  constructor(private toastr: NgToastService, private http : HttpClient,
    private router : Router) { }

  showSuccess(data : any) {
    this.toastr.success({ detail: data});
  }
  showError(data: any){
    this.toastr.error({detail: data});
  }
  showWarning(data:any){
    this.toastr.warning({detail:data});
  }
  login(data: any){
    return this.http.post<any>(this.loginUrl, data);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  user_Details(){
    return this.http.get<any>(this.userDetails);
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
   getUserRole(){
    let userRole:any = localStorage.getItem('user')
    return userRole;
  }
  psw_Forgot(data:any){
    return this.http.put<any>(this.forgotPsw, data);
  }
}