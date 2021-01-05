
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Pipe } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  constructor(private modifySV: CoursesService) { 
    this.addForm = new FormGroup({
      taiKhoan: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      matKhau: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      soDT: new FormControl(null, Validators.required),
      hoTen: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$")]),
      maLoaiNguoiDung: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  addUser(addForm: any): any {
    const objAddUSer = {
      taiKhoan: addForm.value.taiKhoan,
      email: addForm.value.email,
      matKhau: addForm.value.matKhau,
      soDT: addForm.value.soDT,
      hoTen: addForm.value.hoTen,
      maLoaiNguoiDung: addForm.value.maLoaiNguoiDung,
      maNhom: 'GP01'
    }
    console.log(objAddUSer);
    this.modifySV.addUser(objAddUSer).subscribe( (res) => {
      if(res){
        alert('Thêm thành công!')
      }    
    }),
    addForm.reset();
  }


  get taiKhoan(){ return this.addForm.get('taiKhoan')}
  get email(){ return this.addForm.get('email')}
  get password(){ return this.addForm.get('password')}
  get phoneNumber() { return this.addForm.get('soDT')}
  get name() { return this.addForm.get('hoTen')}
  get userType() { return this.addForm.get('maLoaiNguoiDung')}

  

}
