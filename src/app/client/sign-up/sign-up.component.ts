import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private dangKyService: CoursesService) { }

  ngOnInit(): void {
  }

  DangKy(data: any) {
    const objDangKy = {
      taiKhoan: data.form.value.taiKhoan,
      matKhau: data.form.value.matKhau,
      hoTen: data.form.value.hoTen,
      soDT: data.form.value.soDT,
      maNhom: data.form.value.maNhom,
      email: data.form.value.email
    }
    this.dangKyService.dangKy(objDangKy).subscribe( res => console.log(res)
    )
    
    
  }

}
