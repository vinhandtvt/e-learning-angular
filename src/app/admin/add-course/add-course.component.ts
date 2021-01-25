import  Swal  from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
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
  isAddMode: boolean = true;
  id: string = '';
  listGV: any = [];

  constructor(private service: CoursesService, private activatedRoute: ActivatedRoute) { 
    this.courseForm = new FormGroup({
      maKhoaHoc: new FormControl(null, [Validators.required]),
      biDanh: new FormControl(null),
      // tenKhoaHoc: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$")]),
      tenKhoaHoc: new FormControl(null, [Validators.required]),
      moTa: new FormControl(null, [Validators.required]),
      luotXem: new FormControl(null, [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]),
      danhGia: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(5)]),
      hinhAnh: new FormControl(null),
      maNhom: new FormControl(null, [Validators.required]),
      ngayTao: new FormControl(null),
      maDanhMucKhoaHoc: new FormControl(null, [Validators.required]),
      taiKhoanNguoiTao: new FormControl(null)
    })
  }

  

  ngOnInit(): void {   
    this.id = this.activatedRoute.snapshot.params['maKhoaHoc'];
    console.log(this.activatedRoute.snapshot);
    
    this.isAddMode = !this.id;
    
    if(!this.isAddMode) {
      this.service.getCourseDetail(this.id).subscribe( res => {    
        console.log(res);
        this.service.getAllUsersInonePage(res.maNhom).subscribe(res => {
          console.log(res);
          for (const iterator of res) {
              if(iterator.maLoaiNguoiDung === 'GV') {
                this.listGV.push(iterator)
              }
          }
          console.log(this.listGV); // tra ve danh sach giao vien 
        })
            
        console.log(this.listGV);
        
        this.courseForm.patchValue({
        maKhoaHoc: res.maKhoaHoc,
        tenKhoaHoc: res.tenKhoaHoc,
        moTa: res.moTa,
        luotXem: res.luotXem,
        hinhAnh: res.hinhAnh,
        biDanh: res.biDanh,
        maNhom: res.maNhom,
        ngayTao: this.formatDate(res.ngayTao),
        maDanhMucKhoaHoc: res.danhMucKhoaHoc['maDanhMucKhoahoc'],
        taiKhoanNguoiTao: res.nguoiTao['taiKhoan']
        })
        
      })
    }
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
          Swal.fire("Thêm khóa học thành công!")
          
        })
      }
    })
    console.log(course);
    console.log(imgCourse);
    
    courseForm.reset();
    
  }

  updateCourse(courseForm: any, img: any){
    const modifyCourse = {
      maKhoaHoc: courseForm.value.maKhoaHoc,
      biDanh: courseForm.value.biDanh,
      tenKhoaHoc: courseForm.value.tenKhoaHoc,
      moTa: courseForm.value.moTa,
      luotXem: courseForm.value.luotXem,
      danhGia: courseForm.value.danhGia,
      hinhAnh: img[0].name,
      maNhom: courseForm.value.maNhom,
      ngayTao: courseForm.value.ngayTao,
      maDanhMucKhoaHoc: courseForm.value.maDanhMucKhoaHoc,
      taiKhoanNguoiTao: courseForm.value.taiKhoanNguoiTao
    }
    console.log(modifyCourse);
    this.service.updateCourse(modifyCourse).subscribe( res => {
      if( typeof res === 'object') {
        // add image
        console.log(res);
        
        let formData = new FormData;
        formData.append('Files', img[0])
        formData.append('tenKhoaHoc', modifyCourse.tenKhoaHoc );
        this.service.uploadPicture(formData).subscribe( res => {
          console.log(res);
          Swal.fire("Cập nhật khóa học thành công!")
        })
      }

    })
    // courseForm.reset();
    
  }
  private formatDate(date: any) {
    const newFormatDate = date.split('/');
    const d = new Date(newFormatDate.reverse());
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }



  get maKhoaHoc() { return this.courseForm.get('maKhoaHoc')};
  get tenKhoaHoc() { return this.courseForm.get('tenKhoaHoc')};
  get moTa() { return this.courseForm.get('moTa')};
  get luotXem() { return this.courseForm.get('luotXem')};
  get danhGia() { return this.courseForm.get('danhGia')};
  get ngayTao() { return this.courseForm.get('ngayTao')};
  get maNhom() { return this.courseForm.get('maNhom')};
  get maDanhMucKhoaHoc() { return this.courseForm.get('maDanhMucKhoaHoc')};

}
