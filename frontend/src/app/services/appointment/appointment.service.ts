import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseURL = environment.API_URL_TEMPLATE;
  private httpOptions = environment.HTTP_OPTIONS;

  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<Appointment[]> {
    const url = this.baseURL + 'appointments';
    return this.http.get<Appointment[]>(url);
  }

  createAppointment(appointment: Appointment): Observable<any> {
    const url = this.baseURL + 'appointment/create';

    return this.http.post<Appointment[]>(url, appointment, this.httpOptions);
  }

  updateAppointment(appointment: Appointment): Observable<any> {
    const url = this.baseURL + 'appointment/update/'  + appointment.id;
    return this.http.put<Appointment[]>(url, appointment, this.httpOptions);
  }

  deleteAppointment(id: number): Observable<any> {
    const url = this.baseURL + 'appointment/delete/' + id;
    return this.http.delete<Appointment>(url, this.httpOptions);
  }

  // deleteAppointment(id: number): Observable<any> {
  //   const url = this.baseURL + 'appointment/delete' + id;
  //   return this.http.delete<Appointment>(url, this.httpOptions);
  // }
  
  getAppointment(id: number): Observable<Appointment> {
    const url = this.baseURL + 'appointment/' + id;
    return this.http.get<Appointment>(url);
  }

  getPatientAppointments(id: number): Observable<Appointment[]> {
    const url = this.baseURL + 'appointment/patient/' + id;
    return this.http.get<Appointment[]>(url);
  }

  getDepartmentAppointments(name: string): Observable<Appointment[]> {
    const url = this.baseURL + 'appointment/department/' + name;
    return this.http.get<Appointment[]>(url);
  }
}
