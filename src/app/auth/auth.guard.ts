import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import * as localforage from 'localforage';

class Member {
  tokenAccess: string;
  constructor() {
    this.getTokenAccess();
    console.log('aaaaaa');
  }
  async getTokenAccess() {
    this.tokenAccess = await localforage.getItem('token');
    console.log('bbbbbb');
  }
  token() {
    return this.tokenAccess;
  }
}
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const member = new Member();
    console.log('member.tokenAccess->>', member.token());
    return true;
  }
}
