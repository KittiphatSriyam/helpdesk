import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

export class PermissionsAdmin {
  canActivate(token: string): boolean {
    if (token != null && token != undefined && token != '') return true;
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private permissions: PermissionsAdmin, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('adminToken');
    if (this.permissions.canActivate(token)) {
      if (state.url == '/admin') {
        this.router.navigateByUrl('/dashboard');
        return false;
      } else {
        return true;
      }
    } else {
      if (state.url == '/admin') {
        return true;
      } else {
        this.router.navigateByUrl('/admin');
        return false;
      }
    }
  }
}
