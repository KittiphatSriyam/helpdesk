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
  isLogin: Boolean;
  constructor(
    private permissions: Permissions,
    private ms: MemberService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      this.ms.auth().then((token: string) => {
        if (this.permissions.canActivate(token)) {
          if (state.url == '/repair') {
            resolve(true);
          } else {
            this.router.navigateByUrl('/repair');
            resolve(false);
          }
        } else {
          if (state.url == '/' || state.url == '/register') {
            resolve(true);
          } else {
            this.router.navigateByUrl('/');
            resolve(false);
          }
        }
      });
    });
  }
}
