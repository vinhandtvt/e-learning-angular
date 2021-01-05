import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';


// Angular material modules 
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserFilterPipe } from '../pipes/user-filter.pipe';
import { CoursesComponent } from './courses/courses.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { GhiDanhComponent } from './ghi-danh/ghi-danh.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './add-course/add-course.component';



@NgModule({
  declarations: [AdminComponent, DashboardComponent, HeaderComponent, UserProfileComponent, UsersComponent, UserFilterPipe, CoursesComponent, GhiDanhComponent, AddUserComponent, AddCourseComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule, 
    ReactiveFormsModule
  ]

})
export class AdminModule { }
