import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  maNhom: string = 'GP01';
  dataSource: any = [];
  columnsToDisplay: string[] = ['STT', 'MaKhoaHoc', 'TenKhoaHoc', 'HinhAnh', 'LuotXem', 'NguoiTao', 'ThaoTac'];

  constructor(private service: CoursesService) { }

  ngOnInit(): void {
    this.service.getAllCourse(this.maNhom).subscribe( res => {
      this.dataSource = res;
      console.log('data source:', this.dataSource);
      
    })
  }


}
