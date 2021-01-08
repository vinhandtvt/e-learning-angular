import { CoursesService } from './../../services/courses.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor( private courseService: CoursesService, private router: Router, private acitvatedRoute: ActivatedRoute) { }

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

  registerCourse(maKhoaHoc: string) {

    if(this.courseService.daDangNhap()) {
      console.log('Ma khoa hoc ban muon dang ky la',maKhoaHoc);
      this.courseService.courseRegister(maKhoaHoc).subscribe( res => {
        alert(res)
        this.router.navigate([`chi-tiet-khoa-hoc/${maKhoaHoc}`], { relativeTo: this.acitvatedRoute})
      })
    } else {
      this.router.navigate(['/log-in'], {relativeTo: this.acitvatedRoute})
      
    }
  }
  
}
