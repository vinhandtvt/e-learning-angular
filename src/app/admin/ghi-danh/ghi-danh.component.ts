import  Swal  from 'sweetalert2';
import { Component, Output, EventEmitter, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-ghi-danh',
  templateUrl: './ghi-danh.component.html',
  styleUrls: ['./ghi-danh.component.scss']
})
export class GhiDanhComponent implements OnInit {

  userAccount: string = ''; // chứa tài khoản được truyền xuống từ openDialog khi bám vào Ghi danh trên users component
  unResgiteredCourses: any; // chứa các khóa học chưa ghi danh
  selected: any; // để chứa mã khóa học đã chọn
  unAuthenticatedCourses: any[] = []; // để chứa tất cả các khóa học chưa được xác thực
  AuthenticationCourses: any; // chứa các khóa học đã ghi danh
  displayedColumns: string[] = ['position', 'tenKhoaHoc', 'maKhoaHoc', 'thaoTac'];
  @Output() submitClicked = new EventEmitter<any>();
  constructor(private service: CoursesService, public dialogRef: MatDialogRef<GhiDanhComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    this.userAccount = this.data.taiKhoan;
    this.allUnRegisteredCourses();
    this.unAuthCourses();
    this.authCourses();
  }

  allUnRegisteredCourses() {
    this.service.getUnresgiteredCourseByUser(this.userAccount).subscribe( res => {
      this.unResgiteredCourses = res;     
    })
    
  }

  register(maKhoaHoc: string){
    const body = {
      maKhoaHoc: maKhoaHoc,
      taiKhoan: this.userAccount
    }
    this.service.registerCourseByUser(body).subscribe( res => {
      Swal.fire(res)
      this.allUnRegisteredCourses();
      this.unAuthCourses();
      this.authCourses();
    })
    
  }
  unRegister(maKhoaHoc: string) {
    if(confirm("Bạn có chắc hủy khóa học này không ?")) {
      // const body = {
      //   maKhoaHoc: maKhoaHoc,
      //   taiKhoan: this.userAccount
      // }
      this.service.unRegisterCourseByUser(this.userAccount, maKhoaHoc).subscribe( res => {
        Swal.fire(res);
        this.allUnRegisteredCourses();
        this.unAuthCourses();
        this.authCourses();
  
      })
    } else { return }
    
  }

  unAuthCourses() {
    
    this.service.getUnauthenticationCoursesByUser(this.userAccount).subscribe( res => {
      this.unAuthenticatedCourses = res;      
    })
  }

  authCourses() {
    this.service.getAuthenticationCoursesByUser(this.userAccount).subscribe( res => {
      this.AuthenticationCourses = res;
    })
  }

  getMaKhoaHoc(maKhoaHoc: string) {
    console.log(maKhoaHoc);
    
  }
  

}
