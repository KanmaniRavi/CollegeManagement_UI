import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private baseUrl = environment.API_URL;
  private districtCreate = this.baseUrl + "api/district/create";
  private districtGet = this.baseUrl + "api/district/get";
  private districtUpdate = this.baseUrl + "api/district/update";
  private districtDelete = this.baseUrl + "api/district/delete";
  constructor(private http: HttpClient) { }
  district_Create(data:any){
    return this.http.post<any>(this.districtCreate, data);
  }
  district_Get(){
    return this.http.get<any>(this.districtGet);
  }
  district_Edit(id:any){
    return this.http.get<any>(this.districtGet +'/'+ id);
  }
  district_Update(data:any){
    return this.http.put<any>(this.districtUpdate, data);
  }
  district_Delete(id:any){
    return this.http.delete<any>(this.districtDelete +'/'+ id);
  }
}