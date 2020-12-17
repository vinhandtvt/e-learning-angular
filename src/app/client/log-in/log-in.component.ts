import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  formDangNhap: FormGroup;

  constructor(private courseService: CoursesService, private router: Router) {
    this.formDangNhap = new FormGroup({
      taiKhoan: new FormControl(undefined, [Validators.required, Validators.minLength(6)]),
      matKhau: new FormControl()
    });
   }

  ngOnInit(): void {  
  }
  dangNhap(formDangNhap: any): any {
    const objDangNhap = {
      taiKhoan: formDangNhap.value.taiKhoan,
      matKhau: formDangNhap.value.matKhau,
    };
    this.courseService.dangNhap(objDangNhap).subscribe( res => {
      if (res && res.maLoaiNguoiDung === 'HV') {
        localStorage.setItem('userAdmin', JSON.stringify(res));
        this.router.navigate(['/admin']);
      } else {
        alert('Khong phai hOC VIEN');
      }
    });

  }

}
