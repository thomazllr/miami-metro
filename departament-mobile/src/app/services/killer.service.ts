import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Killer } from '../models/killer.model';

@Injectable({
  providedIn: 'root'
})
export class KillerService {
  private apiUrl = `${environment.apiUrl}/killer/killers/`;

  constructor(private http: HttpClient) { }

  getKillers(): Observable<Killer[]> {
    return this.http.get<Killer[]>(this.apiUrl);
  }

  getKiller(id: number): Observable<Killer> {
    return this.http.get<Killer>(`${this.apiUrl}${id}/`);
  }

  createKiller(killer: any): Observable<Killer> {
    return this.http.post<Killer>(this.apiUrl, killer);
  }

  updateKiller(id: number, killer: any): Observable<Killer> {
    return this.http.put<Killer>(`${this.apiUrl}${id}/`, killer);
  }

  deleteKiller(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
