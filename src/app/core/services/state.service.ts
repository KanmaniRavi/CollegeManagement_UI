import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
private baseUrl = environment.API_URL;
private stateCreate = this.baseUrl + "api/state/create";
private stateGet = this.baseUrl + "api/state/get";
private stateUpdate = this.baseUrl + "api/state/update";
private stateDelete = this.baseUrl + "api/state/delete";
  constructor(private http: HttpClient) { }
state_Create(data: any){
  return this.http.post<any>(this.stateCreate, data);
}
state_Get(){
  return this.http.get<any>(this.stateGet);
}
state_Edit(id:any){
  return this.http.get<any>(this.stateGet +'/'+ id);
}
state_Update(data:any){
  return this.http.put<any>(this.stateUpdate, data);
}
state_Delete(id:any){
  return this.http.delete<any>(this.stateDelete +'/'+ id);
}
}