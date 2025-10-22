
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncate Pipe
 * Truncates text to specified length
 */
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  
  transform(value: string, limit: number = 50, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return '';
    
    if (value.length <= limit) {
      return value;
    }

    if (completeWords) {
      limit = value.substring(0, limit).lastIndexOf(' ');
    }

    return value.substring(0, limit) + ellipsis;
  }
}
