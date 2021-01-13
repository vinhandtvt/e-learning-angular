import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: any;
  constructor(private service: CoursesService) { }

  ngOnInit(): void {
    this.user = this.getUserInfo();
  }

  getUserInfo() {
    return JSON.parse(this.service.getToken());
  }

}
