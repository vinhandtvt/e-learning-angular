import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';


export interface khoaHocDaGhiDanh {
  tenKhoaHoc: string,
  position: number;
  maKhoaHoc: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit, OnDestroy {
  userAccount: string = '';
  user: any;
  dataSource: any = [];
  userUpdate: any;
  // private sub: Subscription | undefined;
  sub: Subscription | any;
  khoaHocDaGD: khoaHocDaGhiDanh[] = [];
  displayedColumns: string[] = ['position', 'tenKhoaHoc', 'maKhoaHoc'];
  userForm: FormGroup;
  hide: boolean = true;
  maLoaiNguoiDung: any[] = [
    {value: 'HV', viewValue: 'Học viên'},
    {value: 'GV', viewValue: 'Giáo viên'},
  ];

  constructor(private activatedRoute: ActivatedRoute, private services: CoursesService) { 
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      taiKhoan: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9_-]{3,16}$")]),
      matKhau: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]), //, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$"
      soDT: new FormControl(null, [Validators.required]),
      hoTen: new FormControl(null, [Validators.required]),
      maLoaiNguoiDung: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.sub = this.getUserInfo();   
  }


  
  updateProfile() {
    this.userUpdate = {
      email: this.userForm.value.email, 
      taiKhoan: this.userForm.value.taiKhoan,
      // matKhau: this.userForm.value.matKhau,
      soDT: this.userForm.value.soDT,
      hoTen: this.userForm.value.hoTen,
      matKhau: this.userForm.value.matKhau,
      maLoaiNguoiDung: this.userForm.value.maLoaiNguoiDung,
      maNhom: JSON.parse(this.services.getToken()).maNhom,
       
    }
    console.log("thong tin can cap nhat day",this.userUpdate);
    
    this.services.updateProfile(this.userUpdate).subscribe( res => {
      if(res) {
        Swal.fire("Cập nhật thành công!")
      }
      
    })
    
  }
  getUserInfo() {
    this.activatedRoute.params.subscribe( res => {
      this.userAccount = res.taiKhoan  
      console.log(this.userAccount);
      this.services.getUserInfo(this.userAccount, '').pipe(
        map( res => { this.user = res, this.dataSource = res.chiTietKhoaHocGhiDanh,
          this.userForm.patchValue({
            email: this.user.email,
            taiKhoan: this.user.taiKhoan,
            matKhau: this.user.matKhau,
            soDT: this.user.soDT,
            hoTen: this.user.hoTen,
            maLoaiNguoiDung: this.user.maLoaiNguoiDung
          })
          
        }
        )
      ).subscribe()
    })
  }

    
  get emailError() { return this.userForm.get("email") }
  get taiKhoanError() { return this.userForm.get("taiKhoan")}
  get matKhauError() { return this.userForm.get("matKhau")}
  get hoTenError() { return this.userForm.get("hoTen")}
  get soDTError() { return this.userForm.get("soDT")}

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
