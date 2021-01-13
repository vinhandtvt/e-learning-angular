import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;
  userForm: FormGroup;
  userUpdate: any;
  constructor(private service: CoursesService) {
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      taiKhoan: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9_-]{3,16}$")]),
      matKhau: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]), //, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$"
      soDT: new FormControl(null, [Validators.required]),
      hoTen: new FormControl(null, [Validators.required]),
    })
   }

  ngOnInit(): void {
    this.user = this.getUserInfo();
    console.log(this.user);
    this.userForm.patchValue({
      email: this.user.email,
      taiKhoan: this.user.taiKhoan,
      matKhau: this.user.matKhau,
      soDT: this.user.soDT,
      hoTen: this.user.hoTen,
    })
  }


  getUserInfo() {
    return JSON.parse(this.service.getToken());
  }

  updateProfile(userForm: any) {
    this.userUpdate = {
      email: userForm.value.email, 
      taiKhoan: userForm.value.taiKhoan,
      // matKhau: userForm.value.matKhau,
      soDT: userForm.value.soDT,
      hoTen: userForm.value.hoTen,
      matKhau: userForm.value.matKhau,
      maLoaiNguoiDung: JSON.parse(this.service.getToken()).maLoaiNguoiDung,
      maNhom: JSON.parse(this.service.getToken()).maNhom,
       
    }
    console.log(this.userUpdate);
    
    this.service.updateProfile(this.userUpdate).subscribe( res => {
      if(res) {
        alert("Cập nhật thành công!")
      }
      
    })
    
  }

  get email() { return this.userForm.get('email')};
  get taiKhoan() { return this.userForm.get('taiKhoan')};
  get soDT() { return this.userForm.get('soDT')};
  get hoTen() { return this.userForm.get('hoTen')};
  get matKhau() { return this.userForm.get('matKhau')};

}
