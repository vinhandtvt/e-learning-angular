import { ChiTietKhoaHocComponent } from './chi-tiet-khoa-hoc/chi-tiet-khoa-hoc.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { DanhMucKhoaHocComponent } from './danh-muc-khoa-hoc/danh-muc-khoa-hoc.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent, children : [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'log-in', component: LogInComponent
      },
      {
        path: 'sign-up', component: SignUpComponent
      },
      {
        path: 'danh-muc-khoa-hoc/:maDanhMuc', component: DanhMucKhoaHocComponent
      },
      {
        path: 'chi-tiet-khoa-hoc/:maKhoaHoc', component: ChiTietKhoaHocComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
