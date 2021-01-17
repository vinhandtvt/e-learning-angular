import { ActivatedRoute, Router } from '@angular/router';
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
  maNhom: string = 'GP01';


  constructor( private courseServices: CoursesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if(this.courseServices.daDangNhap()) {
      console.log("da dang nhap nha nha");
      
      this.maNhom = JSON.parse(this.courseServices.getToken()).maNhom;  
    }
    this.activatedRoute.url.subscribe(url => {
      this.courseServices.getCourseByCategory(url[1]?.path, this.maNhom).subscribe(res => {
        this.courses = res; 
                
      })
    });
    // this.courseServices.getCourseByCategory(this.maDanhMuc, this.maNhom).subscribe(res => {
    //   console.log(res);
    // })     
    
  }
  registerCourse(maKhoaHoc: string) {

    if(this.courseServices.daDangNhap()) {
      this.courseServices.courseRegister(maKhoaHoc).subscribe( res => {
        alert(res)
        this.router.navigate([`chi-tiet-khoa-hoc/${maKhoaHoc}`])
      })
    } else {
      this.router.navigate(['/log-in'], {relativeTo: this.activatedRoute})
      
    }
  }


}
