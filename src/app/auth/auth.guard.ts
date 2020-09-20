import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import * as localforage from 'localforage';
import { MemberService } from '../services/member.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private memberService: MemberService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return new Promise((resolve, reject)=>{
      this.memberService.auth().then(result => {
        console.log('result', result);
        if(result != '' && result != null) {
          console.log('route', route.routeConfig.path);
          if(route.routeConfig.path == 'repair' || route.routeConfig.path == 'register') {
            resolve(true);
          } else {
            this.router.navigateByUrl('/repair');
            resolve(false);
          }
        } else {
          this.router.navigateByUrl('');
          resolve(false);
        }
      })
      });   
  }
}
