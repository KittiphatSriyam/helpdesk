import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as localForage from 'localforage';
@Injectable({
  providedIn: 'root',
})
export class MemberService {
  urlRegister: string = 'http://localhost:3000/register';
  urlLogin: string = 'http://localhost:3000/login';

  constructor(private _http: HttpClient) {}

  register(param: any): Observable<any> {
    return this._http.post(this.urlRegister, param);
  }

  login(param: any): Observable<any> {
    return this._http.post(this.urlLogin, param);
  }
  async auth(): Promise<any> {
    const result = await localForage.getItem('token');
    return result;
  }
}
