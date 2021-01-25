import  Swal  from 'sweetalert2';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, Output, EventEmitter, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  hide: boolean = true;
  id:string = '';
  isAddMode: boolean = true;
  submitted = false;


  constructor(private modifySV: CoursesService,
        private activatedRoute: ActivatedRoute,
    ) { 
    this.addForm = new FormGroup({
      taiKhoan: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      matKhau: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      soDT: new FormControl(null, Validators.required),
      hoTen: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$")]),
      maLoaiNguoiDung: new FormControl(),
      maNhom: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['taiKhoan'];    
    this.isAddMode = !this.id;

    if(!this.isAddMode) {
      this.modifySV.getUserInfo(this.id, '').subscribe( res => {
        console.log(res);
        this.addForm.patchValue(res);
        
      })
    }
  }

  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.addForm.invalid) {
  //       return;
  //   }

  //   if (this.isAddMode) {
  //       this.addUser(this.addForm);
  //   } else {
  //     this.updateUser(this.addForm);
  //   }
// }

  addUser(addForm: any): any {
    const objAddUSer = {
      taiKhoan: addForm.value.taiKhoan,
      email: addForm.value.email,
      matKhau: addForm.value.matKhau,
      soDT: addForm.value.soDT,
      hoTen: addForm.value.hoTen,
      maLoaiNguoiDung: addForm.value.maLoaiNguoiDung,
      maNhom: JSON.parse(this.modifySV.getToken()).maNhom
    }
    console.log("thong tin nguoi dung vua tao", objAddUSer);
    this.modifySV.addUser(objAddUSer).subscribe( (res) => {
      if(res){
        Swal.fire('Thêm thành công!');
      }    
    }),
    addForm.reset();
  }

  updateUser(addForm: any) {
    const objUpdatedUSer = {
      taiKhoan: addForm.value.taiKhoan,
      email: addForm.value.email,
      matKhau: addForm.value.matKhau,
      soDT: addForm.value.soDT,
      hoTen: addForm.value.hoTen,
      maLoaiNguoiDung: addForm.value.maLoaiNguoiDung,
      maNhom: addForm.value.maNhom
    }
    this.modifySV.updateProfile(objUpdatedUSer).subscribe(res => {
      if(res) {
        Swal.fire("Cập nhật thành công!")
      }
      
    })
    addForm.reset();
  }


  get taiKhoanError(){ return this.addForm.get('taiKhoan')}
  get emailError(){ return this.addForm.get('email')}
  get passwordError(){ return this.addForm.get('password')}
  get phoneNumberError() { return this.addForm.get('soDT')}
  get nameError() { return this.addForm.get('hoTen')}
  get userTypeError() { return this.addForm.get('maLoaiNguoiDung')}

  

}
