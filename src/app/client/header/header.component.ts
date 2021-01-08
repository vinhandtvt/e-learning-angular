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
  user: any;
  constructor( public courseServices: CoursesService) { }

  ngOnInit(): void {
    this.courseServices.layDanhMucKhoaHoc().subscribe( res => this.danhMucKhoaHoc = res);
    this.user = JSON.parse(this.courseServices.getToken());
    console.log(this.user);
    
  }  
  onSearch(event: any){
    this.courseServices.getSearchItem(event);
  }
}
