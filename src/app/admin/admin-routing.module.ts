import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { CoursesComponent } from './courses/courses.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { UserFilterComponent } from './user-filter/user-filter.component';

const routes: Routes = [
  {
    path:'', component: AdminComponent, canActivate: [AuthGuard],children: [
      {
        path: '', component: UsersComponent,
      },
      {
        path: 'users', children: [
          {
            path: '', component: UsersComponent
          },
          {
            path: 'add' , component: AddUserComponent
          },
          {
            path: 'add/:taiKhoan', component: AddUserComponent
          },
          {
            path: 'filter', component: UserFilterComponent
          },
          {
            path: ':taiKhoan', component: UserProfileComponent
          },
          

        ]
      },
      {
        path:'dashboard', component: DashboardComponent, //canActivate: [AuthGuard]
      },
      {
        path: 'header', component: HeaderComponent
      },
     
      {
        path: 'courses', children: [
          {
            path: '', component: CoursesComponent
          },
          {
            path: 'add-course', component: AddCourseComponent
          },
          {
            path: 'edit-course/:maKhoaHoc', component: AddCourseComponent
          }
        ]
      }
      
      
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
