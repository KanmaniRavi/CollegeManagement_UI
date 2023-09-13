import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private baseUrl = environment.API_URL;
  private facultyCreate = this.baseUrl + "api/faculty/create";
  private facultyGet = this.baseUrl + "api/faculty/get";
  private facultyUpdate = this.baseUrl + "api/faculty/update";
  private facultyDelete = this.baseUrl + "api/faculty/delete";
  private facultyChangeUpdate = "http://101.53.155.156:8087/auth/change/password";
  private facultySearch = this.baseUrl + "api/faculty/search";
  private facultyProflie = this.baseUrl + "api/faculty/updateProfile";

  constructor(private http: HttpClient) { }
  faculty_Create(data:any){
    return this.http.post<any>(this.facultyCreate , data);
  }
  faculty_Get(){
    return this.http.get<any>(this.facultyGet);
  }
  faculty_Edit(id:any){
    return this.http.get<any>(this.facultyGet +'/'+ id);
  }
  faculty_Update(data:any){
    return this.http.put<any>(this.facultyUpdate, data);
  }
  faculty_Delete(id:any){
    return this.http.delete<any>(this.facultyDelete +'/'+ id);
  }
  faculty_Password(data : any){
    return this.http.put<any>(this.facultyChangeUpdate, data);
  }
  faculty_Search(id:any){
    return this.http.get<any>(this.facultySearch +'/'+id);
  }
  faculty_Profile(data:any){
    return this.http.put<any>(this.facultyProflie ,data);
  }
}