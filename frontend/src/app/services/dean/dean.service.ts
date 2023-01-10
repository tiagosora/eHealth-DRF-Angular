import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dean } from 'src/app/models/Dean';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeanService {

  private baseURL = environment.API_URL_TEMPLATE;
  private httpOptions = environment.HTTP_OPTIONS;

  constructor(private http: HttpClient) { }

  getAllDeans(): Observable<Dean[]> {
    const url = this.baseURL + 'deans';
    return this.http.get<Dean[]>(url);
  }

  createDean(dean: Dean): Observable<any> {
    const url = this.baseURL + 'dean/create';
    return this.http.post<Dean[]>(url, dean, this.httpOptions);
  }

  updateDean(dean: Dean): Observable<any> {
    const url = this.baseURL + 'dean/update/'  + dean.user.id;
    return this.http.put<Dean[]>(url, dean, this.httpOptions);
  }

  deleteDean(dean: Dean): Observable<any> {
    const url = this.baseURL + 'dean/delete' + dean.user.id;
    return this.http.delete<Dean>(url, this.httpOptions);
  }

  // deleteDean(id: number): Observable<any> {
  //   const url = this.baseURL + 'dean/delete' + id;
  //   return this.http.delete<Dean>(url, this.httpOptions);
  // }
  
  getDean(id: number): Observable<Dean> {
    const url = this.baseURL + 'dean/' + id;
    return this.http.get<Dean>(url);
  }
}
