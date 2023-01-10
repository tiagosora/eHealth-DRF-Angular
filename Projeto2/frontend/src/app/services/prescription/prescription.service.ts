import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescription } from 'src/app/models/Prescription';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private baseURL = environment.API_URL_TEMPLATE;
  private httpOptions = environment.HTTP_OPTIONS;

  constructor(private http: HttpClient) { }

  getAllPrescriptions(): Observable<Prescription[]> {
    const url = this.baseURL + 'prescriptions';
    return this.http.get<Prescription[]>(url);
  }

  createPrescription(prescription: Prescription): Observable<any> {
    const url = this.baseURL + 'prescription/create';
    return this.http.post<Prescription[]>(url, prescription, this.httpOptions);
  }

  updatePrescription(prescription: Prescription): Observable<any> {
    const url = this.baseURL + 'prescription/update/'  + prescription.id;
    return this.http.put<Prescription[]>(url, prescription, this.httpOptions);
  }

  deletePrescription(prescription: Prescription): Observable<any> {
    const url = this.baseURL + 'prescription/delete' + prescription.id;
    return this.http.delete<Prescription>(url, this.httpOptions);
  }

  // deletePrescription(id: number): Observable<any> {
  //   const url = this.baseURL + 'prescription/delete' + id;
  //   return this.http.delete<Prescription>(url, httpOptions);
  // }
  
  getPrescription(id: number): Observable<Prescription> {
    const url = this.baseURL + 'prescription/' + id;
    return this.http.get<Prescription>(url);
  }

  getPatientPrescriptions(id: number): Observable<Prescription[]> {
    const url = this.baseURL + 'prescription/patient/' + id;
    return this.http.get<Prescription[]>(url);
  }

  getDoctorPrescriptions(id: number): Observable<Prescription[]> {
    const url = this.baseURL + 'prescription/doctor/' + id;
    return this.http.get<Prescription[]>(url);
  }
}
