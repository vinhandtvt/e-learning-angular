import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface khoaHoc {
  maKhoaHoc: string,
  biDanh: string,
  tenKhoaHoc: string,
  moTa: string,
  luotXem: number,
  danhGia: number,
  hinhAnh: string,
  maNhom: string,
  ngayTao: string,
  maDanhMucKhoaHoc: string,
  taiKhoanNguoiTao: object
}
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})

export class AddCourseComponent implements OnInit {

  courseForm: FormGroup;
  constructor(private service: CoursesService) { 
    this.courseForm = new FormGroup({
      maKhoaHoc: new FormControl(null, [Validators.required]),
      biDanh: new FormControl(null),
      tenKhoaHoc: new FormControl(null, [Validators.required]),
      moTa: new FormControl(null, [Validators.required]),
      luotXem: new FormControl(null, [Validators.required]),
      danhGia: new FormControl(null),
      hinhAnh: new FormControl(null, [Validators.required]),
      maNhom: new FormControl(null, [Validators.required]),
      ngayTao: new FormControl(null, [Validators.required]),
      maDanhMucKhoaHoc: new FormControl(null, [Validators.required]),
      taiKhoanNguoiTao: new FormControl(null)
    })
  }

  ngOnInit(): void {
    
  }

  onUpload(courseForm: any , imgCourse: any){
    const course = {
      maKhoaHoc: this.courseForm.value.maKhoaHoc,
      tenKhoaHoc: this.courseForm.value.tenKhoaHoc,
      moTa: this.courseForm.value.moTa,
      luotXem: this.courseForm.value.luotXem,
      danhGia: this.courseForm.value.danhGia,
      hinhAnh: imgCourse[0].name,
      maNhom: this.courseForm.value.maNhom,
      ngayTao: this.courseForm.value.ngayTao,
      maDanhMucKhoaHoc: this.courseForm.value.maDanhMucKhoaHoc,
      taiKhoanNguoiTao: JSON.parse(this.service.getToken()).taiKhoan
    }
    this.service.addCourse(course).subscribe( res => {
      if( typeof res === 'object') {
        // add image
        console.log(res);
        
        let formData = new FormData;
        formData.append('Files', imgCourse[0])
        formData.append('tenKhoaHoc', course.tenKhoaHoc );
        this.service.uploadPicture(formData).subscribe( res => {
          console.log(res);
          
        })
      }
    })
    console.log(course);
    console.log(imgCourse);
    
    courseForm.reset();
    
  }

}
