import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from "rxjs";
import { API_CONFIG } from '../config/api.config';
import { Agenda } from '../models/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  baseUrl = `${API_CONFIG.baseUrl}/agenda`;  

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(this.baseUrl);
  }

  findById(id: any): Observable<Agenda> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Agenda>(url);
  }

  update(agenda: Agenda): Observable<Agenda> {
    const url = `${this.baseUrl}/${agenda.id}`;
    return this.http.put<Agenda>(url, agenda);
  }

  delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  create(agenda: Agenda): Observable<Agenda> {
    return this.http.post<Agenda>(this.baseUrl, agenda);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
