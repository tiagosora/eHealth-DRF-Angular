import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/Department';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
  private baseURL = environment.API_URL_TEMPLATE;
  private httpOptions = environment.HTTP_OPTIONS;

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<any[]> {
    const url = this.baseURL + 'departments';
    return this.http.get<any[]>(url);
  }

  createDepartment(department: Department): Observable<any> {
    const url = this.baseURL + 'department/create';
    return this.http.post<Department[]>(url, department, this.httpOptions);
  }

  updateDepartment(department: Department): Observable<any> {
    const url = this.baseURL + 'department/update/'  + department.name;
    return this.http.put<Department[]>(url, department, this.httpOptions);
  }

  deleteDepartment(department: Department): Observable<any> {
    const url = this.baseURL + 'department/delete' + department.name;
    return this.http.delete<Department>(url, this.httpOptions);
  }
  
  // deleteDepartment(name: string): Observable<any> {
  //   const url = this.baseURL + 'department/delete' + name;
  //   return this.http.delete<Department>(url, this.httpOptions);
  // }
  
  getDepartment(name: string): Observable<Department> {
    const url = this.baseURL + 'department/' + name;
    return this.http.get<Department>(url);
  }

  getDoctorDepartments(id: number): Observable<Department[]> {
    const url = this.baseURL + 'department/doctor/' + id;
    return this.http.get<Department[]>(url);
  }
}
