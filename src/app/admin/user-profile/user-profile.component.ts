import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { map, tap } from 'rxjs/operators';


export interface khoaHocDaGhiDanh {
  tenKhoaHoc: string,
  position: number;
  maKhoaHoc: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit, OnDestroy {
  userAccount: string = '';
  user: any;
  dataSource: any = [];
  private sub: Subscription | undefined;
  khoaHocDaGD: khoaHocDaGhiDanh[] = [];
  displayedColumns: string[] = ['position', 'tenKhoaHoc', 'maKhoaHoc'];

  constructor(private activatedRoute: ActivatedRoute, private services: CoursesService) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe( res => {
      this.userAccount = res.taiKhoan  
      console.log(this.userAccount);
      this.services.getUserInfo(this.userAccount, '').pipe(
        map( res => { this.user = res, this.dataSource = res.chiTietKhoaHocGhiDanh, console.log(this.khoaHocDaGD);
        }
        )
      ).subscribe()
    })
  
  }
  

  
  

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
