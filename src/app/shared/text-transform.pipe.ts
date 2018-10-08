import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTransform'
})
export class TextTransformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value = value.slice(0, 6) + '...' + value.substr(value.length - 3);
  }

}
