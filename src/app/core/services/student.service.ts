import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = environment.API_URL;
  private studentCreate = this.baseUrl+ "api/student/create";
  private studentGet = this.baseUrl+ "api/student/get";
  private studentUpdate = this.baseUrl+ "api/student/update";
  private studentDelete = this.baseUrl+ "api/student/delete";
  private studentPdf = this.baseUrl + "api/student/print/view?branchId";
  private studentXl = this.baseUrl + "api/student/print/xl";
  private studentSearch = this.baseUrl + "api/student/Filter";
  private studentGetDept = this.baseUrl + "api/student/get/studentStatistics";
  constructor(private http: HttpClient) { }
  student_Create(data:any){
    return this.http.post<any>(this.studentCreate, data);
  }
  student_Get(){
    return this.http.get<any>(this.studentGet);
  }
  student_Edit(id:any){
    return this.http.get<any>(this.studentGet +'/'+ id);
  }
  student_Update(data:any){
    return this.http.put<any>(this.studentUpdate, data);
  }
  student_Delete(id:any){
    return this.http.delete<any>(this.studentDelete +'/'+ id);
  }
  student_AllPdf(){
    return this.http.get<any>(this.studentPdf);
  }
  student_Pdf(id:any){
    return this.http.get<any>(this.studentPdf+'='+id);
  }
  student_Xl(id:any){
    return this.http.get<any>(this.studentXl+'/'+id);
  }
  student_Search(studObj:any){
    return this.http.get<any>(this.studentSearch,({params:studObj}));
  }
  student_GetDept(){
    return this.http.get<any>(this.studentGetDept);
  }
}