import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeesmanageService {
  private baseUrl = environment.API_URL;
  private feesDeclarationCreate = this.baseUrl + "api/feesdeclaration/create";
  private feesDeclarationGet = this.baseUrl + "api/feesdeclaration/get";
  private feesDeclarationUpdate = this.baseUrl + "api/feesdeclaration/update";
  private feesDeclarationDelete = this.baseUrl + "api/feesdeclaration/delete";
  private declarationHeadDelete = this.baseUrl + "api/feesdeclaration/delete";
  private searchFeesdeclaration = this.baseUrl + "api/feesdeclaration/search";
  constructor(private http:HttpClient) { }
  feesDeclaration_Create(data:any){
    return this.http.post<any>(this.feesDeclarationCreate, data);
  }
  feesDeclaration_Get(){
    return this.http.get<any>(this.feesDeclarationGet);
  }
  feesDeclaration_Edit(id:any){
    return this.http.get<any>(this.feesDeclarationGet +'/'+ id);
  }
  feesDeclaration_Update(data:any){
    return this.http.put<any>(this.feesDeclarationUpdate, data);
  }
  feesDeclaration_Delete(id: any){
    return this.http.delete<any>(this.feesDeclarationDelete +'/'+ id);
  }
  declaration_HeadDelete(id: any){
    return this.http.delete<any>(this.declarationHeadDelete +'/'+ id);
  }
  search_FeesDeclaration(event:any,id:any){
    let feesObj = {degreeType:event,branchName : id};
    return this.http.get<any>(this.searchFeesdeclaration , ({params:feesObj}));
  }
}