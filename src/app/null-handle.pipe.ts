import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullHandle'
})
export class NullHandlePipe implements PipeTransform {

  transform(value: any): any {
    console.log("value", typeof value);

    if (value === null || value === "NaN" || value === NaN) {
      return 0
    }
    else {
      return value;
    }
  }

}
