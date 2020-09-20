import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MemberService {
  urlRegister: string = 'http://localhost:3000/register';
  urlLogin: string = 'http://localhost:3000/login';
  urlProfile: string = 'http://localhost:3000/getMemberByToken';

  constructor(private _http: HttpClient) {}

  register(param: any): Observable<any> {
    return this._http.post(this.urlRegister, param);
  }

  login(param: any): Observable<any> {
    return this._http.post(this.urlLogin, param);
  }

  auth() {
    const token = localStorage.getItem('token');
    return token;
  }
  getProfile(): Observable<any> {
    const token = this.auth();
    return this._http.post(this.urlProfile, { token: token });
  }
}
