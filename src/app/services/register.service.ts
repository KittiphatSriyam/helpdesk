import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class registerService {
  url: string = 'http://localhost:3000/register';

  constructor(private _http: HttpClient) {}

  save(param: any): Observable<any> {
    return this._http.post(this.url, param);
  }
}
