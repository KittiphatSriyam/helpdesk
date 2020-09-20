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
    const permission = this.permissions.canActivate(this.ms.tokenAccess);

    console.log('this.ms.tokenAccess->>', this.ms.tokenAccess);
    console.log('permission->>', permission);
    console.log(' this.isLogin->>', this.isLogin);

    if (state.url == '/' || state.url == '/register') {
      if (permission) {
        console.log('aaaaaaaa');
        // this.router.navigateByUrl('repair');
      }
    }

    return true;
  }
}
