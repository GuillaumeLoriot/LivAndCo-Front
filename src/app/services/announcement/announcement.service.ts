import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Announcement from '../../models/announcement.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor() { }

  private apiUrl = `${environment.apiUrl}/announcements`;
  private http = inject(HttpClient);
  id: Number | null = null;

  
  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.apiUrl, { headers: { 'accept': 'application/json' } });
  }

  getAnnouncement(id: Number): Observable<Announcement> {

    return this.http.get<Announcement>(this.apiUrl + '/' + id, { headers: { 'accept': 'application/json' } });

  }

  // searchAnnouncements(filters: Partial<SearchFilters>): Observable<Announcement[]> {
  //   let params = new HttpParams;

  //   if (filters.city != null) {
  //     params = params.set('city', filters.city);
  //   }
  //   if (filters.dailyPrice != null) {
  //     params = params.set('dailyPrice[lte]', filters.dailyPrice.toString());
  //   }
  //   if (filters.maxClient != null) {
  //     params = params.set('maxClient[gte]', filters.maxClient.toString());
  //   }

  //   return this.http.get<Announcement[]>(this.apiUrl, { headers: { accept: 'application/json' }, params });

  // }

}
