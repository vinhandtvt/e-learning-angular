import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// export interface khoaHoc {
//   maKhoaHoc: string,
//   biDanh: string,
//   tenKhoaHoc: string,
//   moTa: string,
//   luotXem: number,
//   danhGia: number,
//   hinhAnh: string,
//   maNhom: string,
//   ngayTao: string,
//   maDanhMucKhoaHoc: string,
//   taiKhoanNguoiTao: object
// }
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})

export class AddCourseComponent implements OnInit {
  modifyObj: any = {};
  courseForm: FormGroup;
  constructor(private service: CoursesService) { 
    this.courseForm = new FormGroup({
      maKhoaHoc: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      biDanh: new FormControl(null),
      // tenKhoaHoc: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$")]),
      tenKhoaHoc: new FormControl(null, [Validators.required]),
      moTa: new FormControl(null, [Validators.required]),
      luotXem: new FormControl(null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]),
      danhGia: new FormControl(null),
      hinhAnh: new FormControl(null),
      maNhom: new FormControl(null, [Validators.required]),
      ngayTao: new FormControl(null),
      maDanhMucKhoaHoc: new FormControl(null, [Validators.required]),
      taiKhoanNguoiTao: new FormControl(null)
    })
  }

  

  ngOnInit(): void {
    this.courseToModify();
  }

  onUpload(courseForm: any , imgCourse: any){
    const course = {
      maKhoaHoc: this.courseForm.value.maKhoaHoc,
      tenKhoaHoc: this.courseForm.value.tenKhoaHoc,
      moTa: this.courseForm.value.moTa,
      luotXem: this.courseForm.value.luotXem,
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

  courseToModify(){
    this.service.courseToModify.subscribe( data => {
      this.modifyObj = data;
      const date = new Date(this.modifyObj.ngayTao);
      const mama = this.modifyObj?.danhMucKhoaHoc?.maDanhMucKhoahoc
      this.courseForm.patchValue({
        maKhoaHoc: this.modifyObj?.maKhoaHoc,
        tenKhoaHoc: this.modifyObj?.tenKhoaHoc,
        moTa: this.modifyObj?.moTa,
        luotXem: this.modifyObj?.luotXem,
        hinhAnh: this.modifyObj?.hinhAnh,
        maNhom: this.modifyObj?.maNhom,
        ngayTao: new Date(this.modifyObj?.ngayTao),
        maDanhMucKhoaHoc: mama

      })
      console.log("this is course need tobe modified ", this.modifyObj);
      console.log("this is mama need tobe modified ", date.toDateString());
      
      // this.courseForm.reset();s
    })
  }

  get maKhoaHoc() { return this.courseForm.get('maKhoaHoc')};
  get tenKhoaHoc() { return this.courseForm.get('tenKhoaHoc')};
  get moTa() { return this.courseForm.get('moTa')};
  get luotXem() { return this.courseForm.get('luotXem')};
  get ngayTao() { return this.courseForm.get('ngayTao')};
  get maNhom() { return this.courseForm.get('maNhom')};
  get maDanhMucKhoaHoc() { return this.courseForm.get('maDanhMucKhoaHoc')};

}
