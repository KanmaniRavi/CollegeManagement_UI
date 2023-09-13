import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any, value: any) {
    let filterArr: any[] = [];
    if(value){
      array.forEach((x:any)=>{
        if(this.toLower(x?.firstName)?.includes(value.toLowerCase()) || this.toLower(x?.department)?.includes(value.toLowerCase()) || this.toLower(x?.roleName)?.includes(value.toLowerCase()) || this.toLower(x?.studentFullName)?.includes(value.toLowerCase()) || this.toLower(x?.rollNo)?.includes(value.toLowerCase()) || this.toLower(x?.branchName)?.includes(value.toLowerCase()) || this.toLower(x?.degreeType)?.includes(value.toLowerCase()) || this.toLower(x?.degreeName)?.includes(value.toLowerCase())){
          filterArr.push(x);
        }
      })
    }else {
      filterArr = array;
    }
    return filterArr;
  }
  toLower(value : any){
    let val = value?.toLowerCase();
    return val;
  }
}