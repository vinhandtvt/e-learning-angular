import { SharedModule } from './../shared/shared.module'; // import Shared Module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FilterPipe } from '../pipes/filter.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { UserComponent } from './user/user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import {MatTabsModule} from '@angular/material/tabs';




@NgModule({
  declarations: [ClientComponent, HeaderComponent, LogInComponent, SignUpComponent, HomeComponent, FooterComponent, DanhMucKhoaHocComponent, ChiTietKhoaHocComponent, FilterPipe, UserProfileComponent, RegisterCourseComponent, UserComponent, UserHomeComponent, UserCoursesComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatTabsModule
     // -> added filter pipe to use it inside the component 
  ]
})
export class ClientModule { }
