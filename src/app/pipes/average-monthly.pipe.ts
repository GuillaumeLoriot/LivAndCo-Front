import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageMonthly',
  standalone: true
})
export class AverageMonthlyPipe implements PipeTransform {

  // Pipe de transformation du prix journalier en moyenne mensuelle
  transform(dailyPrice: number): number {
    return Math.floor((dailyPrice * 365) / 12);
  }

}
