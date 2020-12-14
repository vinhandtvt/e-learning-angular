import { CoursesService } from './../../services/courses.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  maNhom: string = 'GP01';
  layDanhSachKhoaHoc: any = [];

  constructor( private courseService: CoursesService) { }

  ngOnInit(): void {
    this.courseService.layDanhSachKhoaHoc(this.maNhom).subscribe( res => this.layDanhSachKhoaHoc = res
    );
  }
  
}
