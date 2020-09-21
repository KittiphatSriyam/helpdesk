import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  url: string = 'http://localhost:3000/repair/';
  constructor(private _http: HttpClient) {}

  addProblem(param: any): Observable<any> {
    return this._http.post(this.url + 'add', param);
  }
  getAllProblem(): Observable<any> {
    return this._http.post(this.url + 'getAllProblem', []);
  }
  getProblemLimited(skip: Number, limit: Number): Observable<any> {
    return this._http.post(this.url + 'getProblemLimited', { skip, limit });
  }
}
