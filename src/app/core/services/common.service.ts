import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl = environment.API_URL;
  private countryIdGet = this.baseUrl + "api/country/get";
  private stateIdGet = this.baseUrl + "api/countrystatedistrict/state/get";
  private stateGetDistrict = this.baseUrl + "api/countrystatedistrict/district/get";
  constructor(private http: HttpClient) { }
  countryId_Get() {
    return this.http.get<any>(this.countryIdGet);
  }
  stateIdBY_CountryGet(id: any) {
    return this.http.get<any>(this.stateIdGet +'/'+ id);
  }
  state_GetDistrict(id:any){
    return this.http.get<any>(this.stateGetDistrict +'/'+ id);
  }
}