import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Case } from '../models/case.model';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiUrl = `${environment.apiUrl}/cases/cases/`;

  constructor(private http: HttpClient) { }

  getCases(search?: string): Observable<Case[]> {
    let params = {};
    if (search) {
      params = { search };
    }
    return this.http.get<Case[]>(this.apiUrl, { params });
  }

  getCase(id: number): Observable<Case> {
    return this.http.get<Case>(`${this.apiUrl}${id}/`);
  }

  createCase(caseData: any): Observable<Case> {
    return this.http.post<Case>(this.apiUrl, caseData);
  }

  updateCase(id: number, caseData: any): Observable<Case> {
    return this.http.put<Case>(`${this.apiUrl}${id}/`, caseData);
  }

  deleteCase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
