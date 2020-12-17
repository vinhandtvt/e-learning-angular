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
      const userLogged = JSON.parse(localStorage.getItem('userAdmin') as string);
        if (!(userLogged && userLogged.accessToken)) {
          this.router.navigate(['/client/dang-nhap']);
          return false;
        }
        return true;
        
      
  }
  
}
