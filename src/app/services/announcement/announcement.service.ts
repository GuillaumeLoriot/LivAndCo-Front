import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Announcement from '../../models/announcement.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HydraCollection } from '../../models/hydra-collection.interface';
import SearchFilters from '../../models/search-filter.interface';


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor() { }

  private apiUrl = `${environment.apiUrl}/announcements`;
  private http = inject(HttpClient);
  id: Number | null = null;

  getAnnouncementsPage(page = 1, itemsPerPage = 6): Observable<HydraCollection<Announcement>> {
    const params = new HttpParams()
      .set('page', page)
      .set('itemsPerPage', itemsPerPage);
    return this.http.get<HydraCollection<Announcement>>(this.apiUrl, { params, headers: { Accept: 'application/ld+json' } });
  }
  
  getAnnouncement(id: Number): Observable<Announcement> {
    return this.http.get<Announcement>(this.apiUrl + '/' + id, { headers: { 'accept': 'application/json' } });
  }

  
  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.apiUrl, { headers: { 'accept': 'application/json' } });
  }


  getSearchedAnnouncementsPage(page = 1, itemsPerPage = 10, filters: Partial<SearchFilters> = {},): Observable<HydraCollection<Announcement>> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('itemsPerPage', String(itemsPerPage));

    if (filters.city) {
      params = params.set('accomodation.city', filters.city);
    }
    if (filters.dailyPrice) {
      params = params.set('dailyPrice[lte]', String(filters.dailyPrice));
    }
    if (filters.nbPlace) {
      params = params.set('nbPlace[gte]', String(filters.nbPlace));
    }
    if (filters.startDate) {
      params = params.set('startDate', String(filters.startDate));
    }
    if (filters.months) {
      params = params.set('months', String(filters.months));
    }

    return this.http.get<HydraCollection<Announcement>>(this.apiUrl, { params, headers: { Accept: 'application/ld+json' } });
  }


  getAnnouncementLd(id: Number): Observable<Announcement> {

    return this.http.get<Announcement>(this.apiUrl + '/' + id, { headers: { 'accept': 'application/ld+json' } });

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
