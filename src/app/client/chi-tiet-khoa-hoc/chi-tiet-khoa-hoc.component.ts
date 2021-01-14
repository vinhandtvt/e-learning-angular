import { CoursesService } from './../../services/courses.service';
// import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Output, EventEmitter, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-chi-tiet-khoa-hoc',
  templateUrl: './chi-tiet-khoa-hoc.component.html',
  styleUrls: ['./chi-tiet-khoa-hoc.component.scss']
})
export class ChiTietKhoaHocComponent implements OnInit {
  course: any;
  maKhoaHoc: string = '123';
  @Output() submitClicked = new EventEmitter<any>();
  
  constructor( private courseServices: CoursesService, private activatedRoute: ActivatedRoute, public dialogRef: MatDialogRef<ChiTietKhoaHocComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // this.maKhoaHoc = this.activatedRoute.snapshot.params.maKhoaHoc;
    this.maKhoaHoc = this.data.maKhoaHoc;
    this.courseServices.getCourseDetail(this.maKhoaHoc).subscribe( res => {
      this.course = res
      
    });
    
    
  }

}
