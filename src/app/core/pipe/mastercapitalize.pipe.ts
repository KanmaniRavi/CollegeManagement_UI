import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mastercapitalize'
})
export class MastercapitalizePipe implements PipeTransform {

  transform(value: any): any {
    if (value && typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  }
  // transform(value: string): any {
  //   let val = value.split(" ");
  //   val.forEach((x: any, i: any) => {
  //     let word = x.toLowerCase().split('');
  //     let j = 0;
  //     while (word[j]) {
  //       word[0] = word[0].toUpperCase();
  //       val[i] = word.join('');
  //       break;
  //     }
  //     j++;
  //   });
  //   let var2 = val.join(" ")
  //   return var2;
  // }
}
