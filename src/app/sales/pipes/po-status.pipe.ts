import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poStatus'
})
export class PoStatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value===1)
      return "Pending";
    else if(value===2)
      return "Progressing";
    else if(value===3)
      return "Modified";
    else if(value===4)
      return "Completed"
    else
      return null;
  }

}
