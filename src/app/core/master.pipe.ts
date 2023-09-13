import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'master'
})
export class MasterPipe implements PipeTransform {

  transform(array: any, value: any) {
    let filterArr: any[] = [];
    if(value){
      array.forEach((x:any)=>{
        if(this.toLower(x?.name)?.includes(value.toLowerCase()) || this.toLower(x?.countryName)?.includes(value.toLowerCase()) || this.toLower(x?.stateName)?.includes(value.toLowerCase()) || this.toLower(x?.degreeName)?.includes(value.toLowerCase()) || this.toLower(x?.degreeType)?.includes(value.toLowerCase()) || this.toLower(x?.branchName)?.includes(value.toLowerCase()) || this.toLower(x?.department)?.includes(value.toLowerCase()) || this.toLower(x?.feesHeadName)?.includes(value.toLowerCase())){
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
