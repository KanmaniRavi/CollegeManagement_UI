import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
private baseUrl = environment.API_URL;
private branchCreate = this.baseUrl + "api/branch/create";
private branchGet = this.baseUrl + "api/branch/get";
private branchUpdate = this.baseUrl + "api/branch/update";
private branchDelete = this.baseUrl + "api/branch/delete";
//degree Id
private branchGetDegreeId = this.baseUrl + 'api/branch/branch/get';
  constructor(private http: HttpClient) { }
  branch_Create(data: any){
    return this.http.post<any>(this.branchCreate, data);
  }
  branch_Get(){
    return this.http.get<any>(this.branchGet);
  }
  branch_GetId(id:any){
    return this.http.get<any>(this.branchGet +'/'+ id);
  }
  branch_Edit(id: any){
    return this.http.get<any>(this.branchGet +'/'+ id);
  }
  branch_Upadate(data: any){
    return this.http.put<any>(this.branchUpdate, data);
  }
  branch_Delete(id:any){
    return this.http.delete<any>(this.branchDelete +'/'+ id);
  }
  branchGet_degreeId(id:any){
    return this.http.get<any>(this.branchGetDegreeId +'/'+ id);
  }
}