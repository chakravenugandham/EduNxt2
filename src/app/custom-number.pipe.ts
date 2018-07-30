import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customNumber"
})
export class CustomNumberPipe implements PipeTransform {
  transform(value: any): any {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return null;
  }
}
