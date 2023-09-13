import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeesService {
  private baseUrl = environment.API_URL;
  private feesCreate = this.baseUrl + "api/fees/create";
  private feesGet = this.baseUrl + "api/fees/get";
  private feesEdit = this.baseUrl + "api/fees/get";
  private feesUpdate = this.baseUrl + "api/fees/update";
  private feesDelete = this.baseUrl + "api/fees/delete";
  constructor(private http: HttpClient) { }

  fees_Create(data: any) {
    return this.http.post<any>(this.feesCreate, data);
  }
  fees_Get() {
    return this.http.get<any>(this.feesGet);
  }
  fees_Edit(id: any) {
    return this.http.get<any>(this.feesEdit + '/' + id);
  }
  fees_Update(data: any) {
    return this.http.put<any>(this.feesUpdate, data);
  }
  fees_Delete(id:any){
    return this.http.delete<any>(this.feesDelete +'/'+ id);
  }
}