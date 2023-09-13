import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl = environment.API_URL;
  private countryCreate = this.baseUrl + "api/country/create";
  private countryGet = this.baseUrl + "api/country/get";
  private coutryUpdate = this.baseUrl + "api/country/update";
  private coutryDelete = this.baseUrl + "api/country/delete";
  constructor(private http: HttpClient) { }

  country_Create(data: any) {
    return this.http.post<any>(this.countryCreate, data);
  }
  country_Get(){
    return this.http.get<any>(this.countryGet);
  }
  country_Edit(id:any){
    return this.http.get<any>(this.countryGet +'/'+ id);
  }
  country_Update(data: any){
    return this.http.put<any>(this.coutryUpdate, data);
  }
  country_Delete(id:any){
    return this.http.delete<any>(this.coutryDelete +'/'+ id);
  }
}