import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './../../services/courses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-danh-muc-khoa-hoc',
  templateUrl: './danh-muc-khoa-hoc.component.html',
  styleUrls: ['./danh-muc-khoa-hoc.component.scss']
})
export class DanhMucKhoaHocComponent implements OnInit {
  courses: any;
  maDanhMuc: string = '';
  maNhom = 'GP01';


  constructor( private courseServices: CoursesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.courseServices.getCourseByCategory(url[1]?.path, this.maNhom).subscribe(res => {
        this.courses = res; 
      })
    });
    // this.courseServices.getCourseByCategory(this.maDanhMuc, this.maNhom).subscribe(res => {
    //   console.log(res);
    // })     
    
  }


}
