import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FeescollectionService {
private baseUrl = environment.API_URL;
private collectionCreate = this.baseUrl + 'api/feescollection/create';
private collectionGet = this.baseUrl + 'api/feescollection/get';
private collectionSearch = this.baseUrl + 'api/feescollection/search';
private collectionUpdate = this.baseUrl + 'api/feescollection/update';
private collectionDelete = this.baseUrl + 'api/feescollection/delete';
private collectionPrint = this.baseUrl + 'api/feesHistory/print/view';
private historyCreate = this.baseUrl + "api/feesHistory/create";
private historySerach = this.baseUrl + "api/feesHistory/search";
private historyWeekly = this.baseUrl + "api/feesHistory/get/accountStatistics";
private historyEdit = this.baseUrl + "api/feesHistory/get";
  constructor(private http: HttpClient) { }
  collection_Create(data: any){
    return this.http.post<any>(this.collectionCreate, data);
  }
  collection_Get(){
    return this.http.get<any>(this.collectionGet);
  }
  collection_Edit(id:any){
    return this.http.get<any>(this.collectionGet +'/'+ id);
  }
  collection_Serach(id:any){
    let rollObj = {rollNo : id}
    return this.http.get<any>(this.collectionSearch, {params:rollObj});
  }
  collection_Update(data:any){
    return this.http.put<any>(this.collectionUpdate, data);
  }
  collection_Delete(id:any){
    return this.http.delete<any>(this.collectionDelete +'/'+ id);
  }
  collection_View(id : any){
    let collection = {feesCollectionHistoryId : id};
    return this.http.get<any>(this.collectionPrint, ({params:collection}));
  }
  history_Create(data:any){
    return this.http.post<any>(this.historyCreate, data);
  }
  history_Search(serachObj:any){
    return this.http.get<any>(this.historySerach, ({params:serachObj}));
  }
  history_Weekly(){
    return this.http.get<any>(this.historyWeekly);
  }
  history_Edit(id:any){
    return this.http.get<any>(this.historyEdit +'/'+ id);
  }
}