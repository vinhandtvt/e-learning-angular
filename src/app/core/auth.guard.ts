import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const userLogged = JSON.parse(localStorage.getItem('token') as string);
      console.log("thong tin user logged", userLogged);
        if (!(userLogged && userLogged.accessToken)) {
          this.router.navigate(['/client/log-in']);
          return false;
        } else if ( userLogged && userLogged.maLoaiNguoiDung === 'HV') {
          alert("Vui lòng đăng nhập với từ cách là quản trị viên!");
          this.router.navigate(['/client'])
          return false;
        }
        return true;
  }
  
}
