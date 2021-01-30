import Swal  from 'sweetalert2';
import { ChiTietKhoaHocComponent } from './../chi-tiet-khoa-hoc/chi-tiet-khoa-hoc.component';
import { CoursesService } from './../../services/courses.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  maNhom: string = 'GP01';
  layDanhSachKhoaHoc: any = [];
  inputSearch: string = '';
  filtered = [];
  myCourses: any[] = [];
  currentUser: any;

  constructor( private courseService: CoursesService, private router: Router, private acitvatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    if( this.courseService.daDangNhap()) {
      this.maNhom = JSON.parse(this.courseService.getToken()).maNhom;
      this.getUserCourses();
    }
    
    this.courseService.layDanhSachKhoaHoc(this.maNhom).subscribe( res => {
      this.layDanhSachKhoaHoc = res; 
      console.log(this.layDanhSachKhoaHoc);
      
    });   
    this.courseService.searchText.subscribe(data => {
      this.inputSearch = data;
      console.log(this.inputSearch);
      
    });
  }

  registerCourse(maKhoaHoc: string) {
    if(this.courseService.daDangNhap()) {
      this.courseService.courseRegister(maKhoaHoc).subscribe( res => {
        Swal.fire(res)
        // this.router.navigate([`chi-tiet-khoa-hoc/${maKhoaHoc}`], { relativeTo: this.acitvatedRoute})
        this.openDialog(maKhoaHoc);
      })
    } else {
      this.router.navigate(['/log-in'], {relativeTo: this.acitvatedRoute})
      
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
    });
  }

  getUserCourses() {
    this.currentUser = JSON.parse(this.courseService.getToken()).taiKhoan
    this.courseService.loggedUserCourses(this.currentUser).subscribe( res => {
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
