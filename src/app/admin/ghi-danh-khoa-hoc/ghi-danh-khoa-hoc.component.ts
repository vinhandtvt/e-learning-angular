import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, Output, EventEmitter, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/services/courses.service';
import { GhiDanhComponent } from '../ghi-danh/ghi-danh.component';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ghi-danh-khoa-hoc',
  templateUrl: './ghi-danh-khoa-hoc.component.html',
  styleUrls: ['./ghi-danh-khoa-hoc.component.scss']
})
export class GhiDanhKhoaHocComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<any>();
  maKhoaHoc: string = '';
  users: any[] = [];
  user: any;
  searchUser: any;
  myControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  waitingUsers: any;
  registeredUsers: any;
  displayedColumns: string[] = ['position', 'taiKhoan', 'hoTen', 'thaoTac'];
  

  constructor(private service: CoursesService, public dialogRef: MatDialogRef<GhiDanhComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {    
    this.maKhoaHoc = this.data.maKhoaHoc;
    this.unRegisterUsers();
    this.awaitingUsers();
    this.registeredUserList();
  }

  displayFn(user: any): string {
    return user && user.hoTen ? user.hoTen : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.users.filter(option => {
      return option.hoTen.toLowerCase().includes(filterValue) 
    } );
  }

  register(taiKhoan: string){
    const body = {
      maKhoaHoc: this.maKhoaHoc,
      taiKhoan: taiKhoan
    }
    console.log(body);
    
    this.service.registerCourseByUser(body).subscribe( res => {
      Swal.fire(res);
      this.unRegisterUsers();
      this.awaitingUsers();
      this.registeredUserList();
    });
    
  }
  unRegister(taiKhoan: any) {
    if(confirm("Bạn có chắc hủy khóa học này không ?")) {
      // const body = {
      //   maKhoaHoc: this.maKhoaHoc,
      //   taiKhoan: taiKhoan
      // }
      this.service.unRegisterCourseByUser(taiKhoan, this.maKhoaHoc).subscribe( res => {
        Swal.fire(res);
        
        this.unRegisterUsers();
      this.awaitingUsers();
      this.registeredUserList();
      
      });
    } else { return }
    
  }

  // lấy danh sách học viên chưa đăng ký khóa học 
  unRegisterUsers() {
    this.service.getUnregisteredUsersByCourse(this.maKhoaHoc).subscribe( res => {
      this.users = res;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.users.slice())
      );
    })  
  }

  //  lấy danh sách học viên chờ xét duyệt
  awaitingUsers() {
    this.service.getWaitingApprovalUsers(this.maKhoaHoc).subscribe( res => {
      this.waitingUsers = res;
      
    })
  }

  // lấy danh sách học viện đã đăng ký khóa học này
  registeredUserList() {
    this.service.getRegisteredUsers(this.maKhoaHoc).subscribe( res => {
      this.registeredUsers = res;
    })
  }


  onSubmit() {
    const user = this.myControl.value.taiKhoan
    this.register(user);
  }
 

}
