import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, Output, EventEmitter, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/services/courses.service';
import { GhiDanhComponent } from '../ghi-danh/ghi-danh.component';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-ghi-danh-khoa-hoc',
  templateUrl: './ghi-danh-khoa-hoc.component.html',
  styleUrls: ['./ghi-danh-khoa-hoc.component.scss']
})
export class GhiDanhKhoaHocComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<any>();
  maKhoaHoc: string = '';
  users: any[] = [];
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

  unRegisterUsers() {
    const body = {
      maKhoaHoc: this.maKhoaHoc
    }
    this.service.getUnregisteredUsersByCourse(body).subscribe( res => {
      this.users = res;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.users.slice())
      );
    })  
  }

  getPosts(value: any) {
    console.log(value);
    
  }

  //  lấy danh sách học viên chờ xét duyệt
  awaitingUsers() {
    const body = {
      maKhoaHoc: this.maKhoaHoc
    }
    this.service.getWaitingApprovalUsers(body).subscribe( res => {
      this.waitingUsers = res;
      
    })
  }

  registeredUserList() {
    const body = {
      maKhoaHoc: this.maKhoaHoc
    }
    this.service.getRegisteredUsers(body).subscribe( res => {
      this.registeredUsers = res;
      
      
    })
  }

}
