import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Announcement from '../../models/announcement.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HydraCollection } from '../../models/hydra-collection.interface';


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

  getAnnouncementsPage(page = 1, itemsPerPage = 10): Observable<HydraCollection<Announcement>> {
    const params = new HttpParams()
      .set('page', page)
      .set('itemsPerPage', itemsPerPage);

    return this.http.get<HydraCollection<Announcement>>(this.apiUrl, { params, headers: { Accept: 'application/ld+json' } });
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
