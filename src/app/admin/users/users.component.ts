import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CoursesService } from 'src/app/services/courses.service';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  maNhom: string = 'GP01';
  page: number = 1;
  size: number = 5;
  inputSearch: string = '';
  // MatPaginator Output
  // MatPaginator Output
  pageEvent!: PageEvent;
  dataSource: any = [];
  columnsToDisplay: string[] = ['index', 'name', 'useraccount', 'soDT', 'role', 'action'];

  constructor(private getUserService: CoursesService) { }

  ngOnInit(): void {
    // this.getUserService.getAllUsers(this.maNhom, this.page, this.size).subscribe( users => {
    //   console.log("lists of users: ", users.items);
    //   this.usersList = users;
    // })
    this.initDataSource();
    this.getUserService.searchText.subscribe(data => {
      this.inputSearch = data;
      console.log(this.inputSearch);
    });
  }

  initDataSource() {
    this.getUserService.getAllUsers(this.maNhom, this.page, this.size).subscribe( data => {
      this.dataSource = data;
      console.log(this.dataSource.items);
      
    })
  }
  
  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.page += 1;
    this.getUserService.getAllUsers(this.maNhom, this.page, this.size).subscribe( data => {
      this.dataSource = data;
     
    })
  }

}
