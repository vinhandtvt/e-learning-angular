// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Filter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: any[], searchText: string = ''): any {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items; 
    }
    searchText = searchText.toString().toLocaleLowerCase();

    return items.filter(it => {
      return it.tenKhoaHoc.toString().toLocaleLowerCase().includes(searchText);
    });
    
  }
}
