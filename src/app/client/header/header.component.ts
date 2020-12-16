import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  danhMucKhoaHoc: any;
  text: any;
  constructor( private courseServices: CoursesService) { }

  ngOnInit(): void {
    this.courseServices.layDanhMucKhoaHoc().subscribe( res => this.danhMucKhoaHoc = res);
  }  
  onSearch(event: any){
    this.courseServices.getSearchItem(event);
  }
}
