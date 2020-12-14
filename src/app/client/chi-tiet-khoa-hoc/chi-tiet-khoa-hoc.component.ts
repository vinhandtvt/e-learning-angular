import { CoursesService } from './../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chi-tiet-khoa-hoc',
  templateUrl: './chi-tiet-khoa-hoc.component.html',
  styleUrls: ['./chi-tiet-khoa-hoc.component.scss']
})
export class ChiTietKhoaHocComponent implements OnInit {
  course: any;
  maKhoaHoc: string = '123';


  constructor( private courseServices: CoursesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.maKhoaHoc = this.activatedRoute.snapshot.params.maKhoaHoc;
    this.courseServices.getCourseDetail(this.maKhoaHoc).subscribe( res => {
      this.course = res
      
    });
    
  }

}
