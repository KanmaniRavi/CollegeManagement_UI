import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionhistoryService {
  private baseUrl = environment.API_URL;
  private createHistory = this.baseUrl + 'api/feesHistory/create';
  private getHistory = this.baseUrl + 'api/feesHistory/get';
  private updateHistory = this.baseUrl + 'api/feesHistory/update';
  private deleteHistory = this.baseUrl + 'api/feesHistory/delete';
  private printHistory = this.baseUrl + 'api/feesHistory/print/view';
  private deptCollection = this.baseUrl + 'api/feesHistory/get/DepartmentCollection';

  constructor(private http: HttpClient) { }
  historyCreate(data:any){
    return this.http.post<any>(this.createHistory, data);
  }
  historyGet(){
    return this.http.get<any>(this.getHistory);
  }
  historyEdit(id:any){
    return this.http.get<any>(this.getHistory +'/'+ id);
  }
  historyUpdate(data:any){
    return this.http.put<any>(this.updateHistory, data);
  }
  historyPrint(id: any){
    let view = {feesCollectionHistoryId : id};
    return this.http.get<any>(this.printHistory, {params: view});
  }
  historyDeptCollection(){
    return this.http.get<any>(this.deptCollection);
  }
}
