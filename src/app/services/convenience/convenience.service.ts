import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Convenience from '../../models/convenience.interface';

@Injectable({
  providedIn: 'root'
})
export class ConvenienceService {


    private apiUrl = `${environment.apiUrl}/conveniences`;
    private http = inject(HttpClient);

  constructor() { }

  getConveniences(): Observable<Convenience[]> {
    return this.http.get<Convenience[]>(this.apiUrl, { headers: { 'accept': 'application/json' } });
  }

}
