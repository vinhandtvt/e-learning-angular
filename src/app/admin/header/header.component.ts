import { CoursesService } from 'src/app/services/courses.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private services : CoursesService) { }

  ngOnInit(): void {
  }

  daDangNhap() {
    this.services.daDangNhap();
  }
  dangXuat() {
    this.services.dangXuat();
  }

}
