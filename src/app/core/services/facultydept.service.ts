import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class FacultydeptService {
private baseUrl = environment.API_URL;
private deptCreate = this.baseUrl + "api/facultyDepartment/create";
private deptGet = this.baseUrl + "api/facultyDepartment/get";
private deptUpdate = this.baseUrl + "api/facultyDepartment/update";
private deptDelete = this.baseUrl + "api/facultyDepartment/delete";
private degreeIdGet = this.baseUrl + "api/degree/get";
  constructor(private http: HttpClient) { }
  dept_Create(data:any){
    return this.http.post<any>(this.deptCreate, data);
  }
  dept_Get(){
    return this.http.get<any>(this.deptGet);
  }
  dept_Edit(id:any){
    return this.http.get<any>(this.deptGet +'/'+ id);
  }
  dept_Update(data:any){
    return this.http.put<any>(this.deptUpdate, data);
  }
  dept_Delete(id:any){
    return this.http.delete<any>(this.deptDelete +'/'+ id);
  }
  degree_Get(){
    return this.http.get<any>(this.degreeIdGet);
  }
}