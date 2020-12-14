import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HeaderComponent } from './header/header.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { DanhMucKhoaHocComponent } from './danh-muc-khoa-hoc/danh-muc-khoa-hoc.component';
import { ChiTietKhoaHocComponent } from './chi-tiet-khoa-hoc/chi-tiet-khoa-hoc.component';


@NgModule({
  declarations: [ClientComponent, HeaderComponent, LogInComponent, SignUpComponent, HomeComponent, FooterComponent, DanhMucKhoaHocComponent, ChiTietKhoaHocComponent],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
