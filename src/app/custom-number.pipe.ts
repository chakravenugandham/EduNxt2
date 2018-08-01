import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customNumber"
})
export class CustomNumberPipe implements PipeTransform {
  transform(value: any): any {
    return Number(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
