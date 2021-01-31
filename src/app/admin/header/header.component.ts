import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedUser: any;
  constructor(private services : CoursesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(this.services.getToken()).taiKhoan;
    console.log(this.loggedUser);
    
  }

  daDangNhap() {
    this.services.daDangNhap();
  }
  dangXuat() {
    this.services.dangXuat();
  }

  getUserInfo(taiKhoan: any) {
    this.router.navigate(['/admin/users/' + taiKhoan], {relativeTo: this.activatedRoute})
  }



}
