import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  private baseUrl = environment.API_URL;
  private degreeCreate = this.baseUrl + "api/degree/create";
  private degreeGet = this.baseUrl + "api/degree/get";
  private degreePut = this.baseUrl + "api/degree/update";
  private degreeDelete = this.baseUrl + "api/degree/delete";
  constructor(private toast : ServiceService,
    private http  : HttpClient) { }
  degree_Post(data : any){
    return this.http.post<any>(this.degreeCreate, data);
  }
  degree_Get(){
    return this.http.get<any>(this.degreeGet);
  }
  degree_Edit(id : any){
    return this.http.get<any>(this.degreeGet +'/'+ id);
  }
  degreeUpdate(data: any){
    return this.http.put<any>(this.degreePut, data);
  }
  degree_Delete(id : any){
    return this.http.delete<any>(this.degreeDelete +"/"+ id);
  }
}