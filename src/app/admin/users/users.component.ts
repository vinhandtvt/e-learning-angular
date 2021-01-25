import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CoursesService } from 'src/app/services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GhiDanhComponent } from '../ghi-danh/ghi-danh.component';
import { AddUserComponent } from '../add-user/add-user.component';






@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  maNhom: string = 'GP01';
  page: number = 1;
  size: number = 20;
  inputSearch: string = '';
  // MatPaginator Output
  // MatPaginator Output
  pageEvent!: PageEvent;
  dataSource: any = [];
  columnsToDisplay: string[] = ['index', 'name', 'useraccount', 'soDT', 'role', 'action'];
  token: any;


  constructor(private getUserService: CoursesService, private snackbar: MatSnackBar, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    // this.getUserService.getAllUsers(this.maNhom, this.page, this.size).subscribe( users => {
    //   console.log("lists of users: ", users.items);
    //   this.usersList = users;
    // })
    this.initDataSource();
    
    
    this.getUserService.searchText.subscribe(data => {
      this.inputSearch = data;
      console.log(this.inputSearch);
    });
    
  }

  initDataSource() {
    this.getUserService.getAllUsers(this.maNhom, this.page, this.size).subscribe( data => {
      this.dataSource = data;  
      console.log(this.dataSource);
      
       
    })
  }
  
  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.page += 1;
    this.getUserService.getAllUsers(this.maNhom, this.page, this.size).subscribe( data => {
      this.dataSource = data;
     
    })
  }
  deleteUser(taiKhoan: string) {
    if(confirm(`Bạn có muốn xóa người dùng ${taiKhoan} không ?`)) {
      this.getUserService.deleteUser(taiKhoan).subscribe( res => {
        this.initDataSource();
        this.snackbar.open(res.toString(), '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
    }
  }

  // user information detail
  openDialog(targetAccount: any) {
    const dialogRef = this.dialog.open(GhiDanhComponent, {
      data: {
        taiKhoan: targetAccount
      }
    });

    dialogRef.afterClosed().subscribe( res => {
      console.log(`Dialog result: ${res}`);
      
    })
  }

  getUserInfo(taiKhoan: any) {
    this.router.navigate(['/admin/users/' + taiKhoan], {relativeTo: this.activatedRoute})
  }

  updateUser(data: any){
    this.router.navigate([`/admin/users/add/`, data.taiKhoan], {relativeTo: this.activatedRoute})
  }

}
