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
      this.ms.auth().then((result) => {
        console.log('result', result);
        if (result != '' && result != null) {
          console.log('route', route.routeConfig.path);
          if (
            route.routeConfig.path == 'repair' ||
            route.routeConfig.path == 'register'
          ) {
            resolve(true);
          } else {
            this.router.navigateByUrl('/repair');
            resolve(false);
          }
        } else {
          this.router.navigateByUrl('');
          resolve(false);
        }
      });
    });
  }
}
