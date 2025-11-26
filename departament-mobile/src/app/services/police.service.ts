import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PoliceOfficer } from '../models/police-officer.model';

@Injectable({
  providedIn: 'root'
})
export class PoliceService {
  private apiUrl = `${environment.apiUrl}/police/officers/`;

  constructor(private http: HttpClient) { }

  getOfficers(): Observable<PoliceOfficer[]> {
    return this.http.get<PoliceOfficer[]>(this.apiUrl);
  }

  getOfficer(id: number): Observable<PoliceOfficer> {
    return this.http.get<PoliceOfficer>(`${this.apiUrl}${id}/`);
  }

  createOfficer(officer: FormData): Observable<PoliceOfficer> {
    return this.http.post<PoliceOfficer>(this.apiUrl, officer);
  }

  updateOfficer(id: number, officer: FormData): Observable<PoliceOfficer> {
    return this.http.put<PoliceOfficer>(`${this.apiUrl}${id}/`, officer);
  }

  deleteOfficer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
