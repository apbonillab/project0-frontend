import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const URL = environment.url;
const LOGIN = '/login';
const USERS = 'users';
@Injectable()
export class AuthenticatedService {

  constructor(private http: HttpClient) { }

  login(loginData: Login): Observable<any> {
    return this.http.post<any>(URL + USERS+LOGIN, loginData);
}

register(loginData: Login): Observable<any> {
  return this.http.post<any>(URL + USERS+"/", loginData);
}
isAuthenticated(){
   const token = localStorage.getItem('token');
  if (token) {
    return true;
    }
  else 
    return false;
  }
}
