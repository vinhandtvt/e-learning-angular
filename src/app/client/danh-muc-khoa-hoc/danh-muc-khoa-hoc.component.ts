import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from './../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChiTietKhoaHocComponent } from '../chi-tiet-khoa-hoc/chi-tiet-khoa-hoc.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-danh-muc-khoa-hoc',
  templateUrl: './danh-muc-khoa-hoc.component.html',
  styleUrls: ['./danh-muc-khoa-hoc.component.scss']
})
export class DanhMucKhoaHocComponent implements OnInit {
  courses: any;
  maDanhMuc: string = '';
  maNhom: string = 'GP01';
  myCourses: any[] = [];
  currentUser: any;


  constructor( private courseServices: CoursesService, private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.courseServices.daDangNhap()) {
      this.maNhom = JSON.parse(this.courseServices.getToken()).maNhom;
      this.getUserCourses(); 
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
        Swal.fire(res)
        this.openDialog(maKhoaHoc);
      })
    } else {
      this.router.navigate(['/log-in'], {relativeTo: this.activatedRoute})
      
    }
  }

  openDialog(targetCourse: any) {
    const dialogRef = this.dialog.open(ChiTietKhoaHocComponent, {
      data: {
        maKhoaHoc: targetCourse,
        daDangKy: this.daDangKy(targetCourse, this.myCourses)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.router.navigate(['.'], {relativeTo: this.activatedRoute})
      this.getUserCourses();
    });
  }

  getUserCourses() {
    this.currentUser = JSON.parse(this.courseServices.getToken()).taiKhoan
    this.courseServices.loggedUserCourses(this.currentUser).subscribe( res => {
      this.myCourses = res.chiTietKhoaHocGhiDanh;
      console.log('Cac khoa hoc da ghi danh', this.myCourses);
         
    })
    
  }

  daDangKy(id: string, list: any) {
    let i;
    for (i = 0; i < list.length; i++) {
      if(list[i].maKhoaHoc === id) {
        return true
      }
    }
    return false;
  }


}
