import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string = ''): any {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items; 
    }
    searchText = searchText.toString().toLocaleLowerCase();

    return items.filter(it => {
      // return it.taiKhoan.toString().toLocaleLowerCase().includes(searchText);
      return it.hoTen.toString().toLocaleLowerCase().includes(searchText);
    });
    
  }
}
