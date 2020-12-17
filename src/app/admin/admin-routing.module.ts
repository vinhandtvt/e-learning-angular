import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'', component: AdminComponent,children: [
      {
        path:'', component: DashboardComponent
      },
      {
        path: 'header', component: HeaderComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
