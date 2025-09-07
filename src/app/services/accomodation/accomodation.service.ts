import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Accomodation from '../../models/accomodation.interface';
import { enableAuthContext } from '../../interceptors/authentification/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AccomodationService {

  constructor() { }

  private apiUrl = `${environment.apiUrl}/accomodations`;
  private http = inject(HttpClient);
  id: Number | null = null;

  
  // Récupère les logements appartenants au userId transmis en paramètre
  getAccomodations(userId: number): Observable<Accomodation[]> {

    const params = new HttpParams()
      .set('owner.id', String(userId));

    return this.http.get<Accomodation[]>(this.apiUrl, {
      params,
      headers: { accept: 'application/json' },
      // Permet de dire qu'il faut que l'interceptor ajoute le token pour cette requète
      context: enableAuthContext(),
    });
  }

}
