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

const routes: Routes = [
  {
    path:'', component: AdminComponent,children: [
      {
        path: '', component: UsersComponent
      },
      {
        path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
      },
      {
        path: 'header', component: HeaderComponent
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
            path: ':taiKhoan', component: UserProfileComponent
          }
          
        ]
      },
      {
        path: 'courses', children: [
          {
            path: '', component: CoursesComponent
          },
          {
            path: 'add-course', component: AddCourseComponent
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
