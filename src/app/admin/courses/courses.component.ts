import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private service: CoursesService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource(){
    this.service.getAllCourse(this.maNhom).subscribe( res => {
      this.dataSource = res;      
    })
  }

  deleteCourse(maKhoaHoc: string) {
    if(confirm(`Bạn có muốn xóa khóa học mã ${maKhoaHoc} không ?`)) {
      this.service.deleteCourse(maKhoaHoc).subscribe( res => {
        this.initDataSource();
        this.snackbar.open(res.toString(), '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
    }
  
    
  }


}
