import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {
  transform(content: string, limit?: number): any {

    if (!limit || !content) return '';

    if (content.length < limit) return content;

    return content.substr(0, limit) + '...';
  }
}
