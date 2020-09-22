import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from '../services/member.service';

export class Permissions {
  canActivate(token: string): boolean {
    if (token != null && token != undefined && token != '') return true;
    return false;
  }
}
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private permissions: Permissions, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    if (this.permissions.canActivate(token)) {
      if (state.url == '/repair') {
        return true;
      } else {
        this.router.navigateByUrl('/repair');
        return false;
      }
    } else {
      if (state.url == '/' || state.url == '/register') {
        return true;
      } else {
        this.router.navigateByUrl('/');
        return false;
      }
    }
  }
}
