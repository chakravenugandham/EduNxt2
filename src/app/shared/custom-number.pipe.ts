import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber'
})
export class CustomNumberPipe implements PipeTransform {
  transform(value: any): any {
    if (value === null || value === 'NaN' || value === NaN) {
      return 0;
    } else {
      return Number(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
}
