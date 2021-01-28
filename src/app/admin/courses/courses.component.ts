import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { GhiDanhKhoaHocComponent } from '../ghi-danh-khoa-hoc/ghi-danh-khoa-hoc.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterViewInit {

  maNhom: string = 'GP01';
  public dataSource = new MatTableDataSource<any>();
  public columnsToDisplay: string[] = ['STT', 'MaKhoaHoc', 'TenKhoaHoc', 'HinhAnh', 'LuotXem', 'NguoiTao', 'ThaoTac'];

  constructor(private service: CoursesService, private snackbar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.initDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  initDataSource(){
    this.service.getAllCourse(this.maNhom).subscribe( res => {
      this.dataSource.data = res as any;      
    })
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCourse(maKhoaHoc: string) {
    if(confirm(`Bạn có muốn xóa khóa học mã ${maKhoaHoc} không ?`)) {
      this.service.deleteCourse(maKhoaHoc).subscribe( res => {
        this.initDataSource();
        this.snackbar.open(res.toString(), '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
    }
  
    
  }

  // modify course 
  modifyCourse(data: any) {
    this.router.navigate([`/admin/courses/edit-course/`, data?.maKhoaHoc], { relativeTo: this.activatedRoute})
  }

  // Ghi danh functions

  openDialog(maKhoaHoc: string) {
    const dialogRef = this.dialog.open(GhiDanhKhoaHocComponent, {
      data: {
        maKhoaHoc: maKhoaHoc
      }
    });
    
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      
    })
  }


}
