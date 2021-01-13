import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit {

  currentUser: any;
  myCourses: any;
  constructor(private service: CoursesService) { }

  ngOnInit(): void {
    this.getUserCourses()
  }

  getUserCourses() {
    this.currentUser = JSON.parse(this.service.getToken()).taiKhoan
    this.service.loggedUserCourses(this.currentUser).subscribe( res => {
      this.myCourses = res.chiTietKhoaHocGhiDanh;
      console.log(this.myCourses);
         
    })
    
  }

  cancelCourse(maKhoaHoc: string) {
    this.service.cancelCourse(maKhoaHoc).subscribe ( res => {
      alert(res);
      this.getUserCourses();
    })
    
  }

}
