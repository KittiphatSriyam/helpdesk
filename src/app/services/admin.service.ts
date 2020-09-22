import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url: string = 'http://localhost:3000/admin';

  constructor(private _http: HttpClient) {}

  adminLogin(param): Observable<any> {
    return this._http.post(this.url + '/login', param);
  }
}
