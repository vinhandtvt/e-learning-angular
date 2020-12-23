import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  searchUser: string = '';

  constructor(private search: CoursesService) { }

  ngOnInit(): void {
  }

  onSearch(event: any){
    this.search.getSearchItem(event);
  }

}
