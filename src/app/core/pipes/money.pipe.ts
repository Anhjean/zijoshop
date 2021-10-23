import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return String(value ? value : 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ' +environment.prestashop.unitFormat.defaultCurrency;
  }

}
