import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times',
  standalone: true
})
export class TimesPipe implements PipeTransform {

  transform(number: number): any[] {
    return Array.from({ length: number });
  }

}
