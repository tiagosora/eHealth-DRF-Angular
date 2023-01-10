import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/Patient';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseURL = environment.API_URL_TEMPLATE;
  private httpOptions = environment.HTTP_OPTIONS;

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    const url = this.baseURL + 'patients';
    return this.http.get<Patient[]>(url);
  }

  updatePatient(id : number, data: {}): Observable<any> {
    const url = this.baseURL + 'patient/update/'  + id;
    return this.http.put<Patient[]>(url, data, this.httpOptions);
  }

  getPatient(id: number): Observable<Patient> {
    const url = this.baseURL + 'patient/' + id;
    return this.http.get<Patient>(url);
  }
}
