import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { CoursesService } from 'src/app/services/courses.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit, AfterViewInit {

  public columnsToDisplay: string[] = ['index', 'name', 'useraccount', 'soDT', 'role', 'action'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: CoursesService) { }

  ngOnInit(): void {
    this.getAllusers()
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllusers() {
    return this.service.getAllUsersInonePage("GP01").subscribe( res => {
      this.dataSource.data = res as any;
      console.log(this.dataSource.data);
      
      
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
