import { CoursesService } from './../../services/courses.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  maNhom: string = 'GP01';
  layDanhSachKhoaHoc: any = [];
  inputSearch: string = '';
  filtered = [];

  constructor( private courseService: CoursesService) { }

  ngOnInit(): void {
    console.log(this.courseService.searchText);
    
    this.courseService.layDanhSachKhoaHoc(this.maNhom).subscribe( res => {
      this.layDanhSachKhoaHoc = res;      

    });   
    this.courseService.searchText.subscribe(data => {
      this.inputSearch = data;
      console.log(this.inputSearch);
      
    });
  }
  
}
