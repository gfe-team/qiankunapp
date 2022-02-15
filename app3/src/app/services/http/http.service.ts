import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { environment } from "../../../environments/environment";

const {
  api_root: apiRoot
} = environment;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // Define API
  private APIURL = apiRoot;

  // Http Options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
  }


  public get(
    method: string,
    params?:any
  ): Observable<any> {
    return this.http.get(`${this.APIURL}${method}`, {
      params:params
     }).pipe(
      retry(1),
      tap(_ => this.log(`get response : ${method}`)),
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public post(
    method: string,
    data?:any,
    httpHeader?:any
  ): Observable<any> {

    const params = data || {};
    const header = httpHeader || this.httpOptions;
    return this.http.post(`${this.APIURL}${method}`, params, header).pipe(
      retry(1),
      tap(_ => this.log(`post data : ${method}`)),
      map(this.extractData),
      catchError(this.handleError)
    );
  }


  private extractData(res: any) {
    return res || {};
  }

  private handleError(error: HttpErrorResponse | any): Observable<never> {
    console.log(error);
    return throwError(error);
  }

  private log(message: string) {
    console.log(message);
  }
}
