import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Emitter } from 'src/app/emitters/emitters';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseURL = environment.API_URL_TEMPLATE;
  private httpOptions = environment.HTTP_OPTIONS;

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {}

  getUserById(id: number): Observable<User> {
    const url = this.baseURL + 'user/' + id;
    return this.http.get<User>(url);
  }

  signup(data: {}): Observable<any> {
    const url = this.baseURL + 'signup';
    return this.http.post(url, data, {withCredentials: true});
  }

  login(data: {}): Observable<any> {
    const url = this.baseURL + 'login';
    return this.http.post(url, data, {withCredentials: true});
  }

  logout(): Observable<any> | any{
    document.cookie = "jwt= ; Max-Age=0"
    Emitter.isAuthenticated.emit(false);
    this.router.navigate([""]).then(() => window.location.reload())
  }

  getJWTCookie() : string {
    return document.cookie.split(';').map(c => c.trim()).filter(
      c => {
        return c.substring(0, 4) === `jwt=`;
      }).map(c => {
        return decodeURIComponent(c.substring(4));
      })[0] || ""
  }

  isAuthenticated(): void {
    const url = this.baseURL + 'user';

    const http_options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'jwt':this.getJWTCookie(),
      })
    };

    if (this.getJWTCookie()) {
      let valid : boolean = false;
      this.http.get(url, http_options).subscribe(
        response => {
          valid = true;
          Emitter.isAuthenticated.emit(true);

          const user : User = response as User
          Emitter.userId.emit(user.id);

          if (user.is_patient) {
            Emitter.usertype.emit("patient")
          }
          if (user.is_doctor) {
            Emitter.usertype.emit("doctor")
          }
          if (user.is_dean) {
            Emitter.usertype.emit("dean")
          }
        }
      )

      if (valid == false) {
        Emitter.isAuthenticated.emit(false);
        Emitter.usertype.emit("not_authenticated")
        Emitter.userId.emit(undefined);
      }

    }
  }
}
