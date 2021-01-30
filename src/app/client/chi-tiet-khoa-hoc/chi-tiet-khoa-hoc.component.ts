import { CoursesService } from './../../services/courses.service';
// import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Output, EventEmitter, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-chi-tiet-khoa-hoc',
  templateUrl: './chi-tiet-khoa-hoc.component.html',
  styleUrls: ['./chi-tiet-khoa-hoc.component.scss']
})
export class ChiTietKhoaHocComponent implements OnInit {
  course: any;
  maKhoaHoc: string = '123';
  daDangKy: boolean = false;
  @Output() submitClicked = new EventEmitter<any>();
  
  constructor( private courseServices: CoursesService, private router: Router, private activatedRoute: ActivatedRoute, public dialogRef: MatDialogRef<ChiTietKhoaHocComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // this.maKhoaHoc = this.activatedRoute.snapshot.params.maKhoaHoc;
    this.maKhoaHoc = this.data.maKhoaHoc;
    this.daDangKy = this.data.daDangKy;    
    this.courseServices.getCourseDetail(this.maKhoaHoc).subscribe( res => {
      this.course = res
      
    });
    
    
  }

  registerCourse(maKhoaHoc: string) {
    if(this.courseServices.daDangNhap()) {
      this.courseServices.courseRegister(maKhoaHoc).subscribe( res => {
        Swal.fire(res);
        // this.router.navigate([`chi-tiet-khoa-hoc/${maKhoaHoc}`], { relativeTo: this.acitvatedRoute})
        // this.openDialog(maKhoaHoc);
        
      })
    } else {
      this.router.navigate(['/log-in'], {relativeTo: this.activatedRoute})
      
    }
  }


}
