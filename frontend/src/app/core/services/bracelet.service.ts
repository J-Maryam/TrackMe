import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bracelet } from '../../shared/models/bracelet.model';

@Injectable({
  providedIn: 'root',
})
export class BraceletService {
  private apiUrl = 'http://localhost:8080/api/public/bracelets';

  constructor(private http: HttpClient) {}

  getBraceletById(id: number): Observable<Bracelet> {
    return this.http.get<Bracelet>(`${this.apiUrl}/${id}`);
  }
}
