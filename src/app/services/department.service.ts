import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class departmentService {
  url: string = 'http://localhost:3000/getDepartment';

  constructor(private _http: HttpClient) {}

  getDepartment(): Observable<any> {
    return this._http.post(this.url, {});
  }
}
