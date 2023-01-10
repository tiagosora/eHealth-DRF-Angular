import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/models/Doctor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseURL = environment.API_URL_TEMPLATE;
  private httpOptions = environment.HTTP_OPTIONS;

  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<Doctor[]> {
    const url = this.baseURL + 'doctors';
    return this.http.get<Doctor[]>(url);
  }

  createDoctor(doctor: Doctor): Observable<any> {
    const url = this.baseURL + 'doctor/create';
    return this.http.post<Doctor[]>(url, doctor, this.httpOptions);
  }

  updateDoctor(id: number, data: {}): Observable<any> {
    const url = this.baseURL + 'doctor/update/'  + id;
    return this.http.put<Doctor[]>(url, data, this.httpOptions);
  }

  deleteDoctor(doctor: Doctor): Observable<any> {
    const url = this.baseURL + 'doctor/delete' + doctor.user.id;
    return this.http.delete<Doctor>(url, this.httpOptions);
  }

  // deleteDoctor(id: number): Observable<any> {
  //   const url = this.baseURL + 'doctor/delete' + id;
  //   return this.http.delete<Doctor>(url, this.httpOptions);
  // }
  
  getDoctor(id: number): Observable<Doctor> {
    const url = this.baseURL + 'doctor/' + id;
    return this.http.get<Doctor>(url);
  }
}
