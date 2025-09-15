import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Reservation from '../../models/reservation.interface';
import { enableAuthContext } from '../../interceptors/authentification/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }
  private apiUrl = `${environment.apiUrl}/reservations`;
  private http = inject(HttpClient);
  reservationId: Number | null = null;
  today: string = this.formatDateYMD(new Date());

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl, { headers: { 'accept': 'application/json' } });
  }

  getReservation(reservationId: Number): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + '/' + reservationId, {
      headers: { 'accept': 'application/json' },
      context: enableAuthContext(),
    });
  }

  // Réservations en attente de validation par le owner de l'annonce
  getReservationRequests(userId: number): Observable<Reservation[]> {
    const params = new HttpParams()
      .set('announcement.accomodation.owner.id', String(userId))
      .set('status', 'pending');

    return this.http.get<Reservation[]>(this.apiUrl, {
      params,
      headers: { accept: 'application/json' },
      // Permet de dire qu'il faut que l'interceptor ajoute le token pour cette requète
      context: enableAuthContext(),
    });
  }

  createReservation(reservation: { startDate: string; duration: number; announcement: string }): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation, {
      headers: { 'accept': 'application/json' },
      context: enableAuthContext(),
    });
  }

  confirmReservation(id: number, changes: Partial<Reservation>): Observable<Reservation> {
    return this.http.patch<Reservation>(this.apiUrl + '/' + id, changes, {
      headers: {
        'content-type': 'application/merge-patch+json',
        'accept': 'application/json'
      },
      context: enableAuthContext()
    });
  }

  // Réservations en cours pour un user donné
  getOngoingUserReservations(userId: number): Observable<Reservation[]> {
    const params = new HttpParams()
      .set('user.id', String(userId))
      .set('startDate[before]', this.today)
      .set('endDate[after]', this.today)
      .set('order[endDate]', 'asc');

    return this.http.get<Reservation[]>(this.apiUrl, {
      params,
      headers: { accept: 'application/json' },
      // Permet de dire qu'il faut que l'interceptor ajoute le token pour cette requète
      context: enableAuthContext(),
    });
  }

  // Réservations à venir pour un user donné
  getUpcomingUserReservations(userId: number): Observable<Reservation[]> {
    const params = new HttpParams()
      .set('user.id', String(userId))
      .set('startDate[strictly_after]', this.today)
      .set('order[startDate]', 'asc');

    return this.http.get<Reservation[]>(this.apiUrl, {
      params,
      headers: { accept: 'application/json' },
      // Permet de dire qu'il faut que l'interceptor ajoute le token pour cette requète
      context: enableAuthContext(),
    });
  }

  // Réservations passées pour un user donné
  getPastUserReservations(userId: number): Observable<Reservation[]> {
    const params = new HttpParams()
      .set('user.id', String(userId))
      .set('endDate[strictly_before]', this.today)
      .set('order[endDate]', 'desc');

    return this.http.get<Reservation[]>(this.apiUrl, {
      params,
      headers: { accept: 'application/json' },
      // Permet de dire qu'il faut que l'interceptor ajoute le token pour cette requète
      context: enableAuthContext(),
    });
  }


  // Méthode pour transformer une Date en chaîne "YYYY-MM-DD" en heure locale
  private formatDateYMD(date: Date): string {
    const year = date.getFullYear();
    // j’ajoute 1 car getMonth() commence à 0, puis je pad en 2 chiffres
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
  }

}
