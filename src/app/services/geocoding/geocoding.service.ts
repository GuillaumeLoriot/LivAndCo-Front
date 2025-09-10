import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import BanFeature from '../../models/ban-feature.interface';
import { BanResponse } from '../../models/ban-response.interface';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private http = inject(HttpClient);
  private url = 'https://api-adresse.data.gouv.fr/search/';


  constructor() { }


  searchMunicipalities(query: string, limit = 5): Observable<BanFeature[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('limit', String(limit))
      .set('autocomplete', '1')
      .set('type', 'municipality');
    // J'envoie la requête HTTP et, grâce à pipe, j'applique map pour récupérer uniquement response.features
    // (ou un tableau vide si absent) afin que l’appelant reçoive directement une liste de suggestions.
    return this.http.get<BanResponse>(this.url, { params })
      .pipe(map((response) => response.features ?? []));
  }




  // Recherche de rues dans une commune (filtrage par citycode ou postcode)
  searchStreets(query: string, citycode?: string, postcode?: string, limit = 5): Observable<BanFeature[]> {
    let params = new HttpParams()
      .set('q', query)
      .set('limit', String(limit))
      .set('autocomplete', '1')
      .set('type', 'street');

    if (citycode) params = params.set('citycode', citycode);
    if (postcode) params = params.set('postcode', postcode);

    // On envoie la requête HTTP et on récupère directement la liste des features (ou un tableau vide).
    return this.http.get<BanResponse>(this.url, { params })
      .pipe(map((response) => response.features ?? []));
  }



  // Recherche d’adresses précises (ex. "12 rue …"), filtrée par commune si possible
  searchAddress(query: string, citycode?: string, postcode?: string, limit = 5): Observable<BanFeature[]> {
    let params = new HttpParams()
      .set('q', query)
      .set('limit', String(limit))
      .set('autocomplete', '1')
      .set('type', 'housenumber');

    if (citycode) params = params.set('citycode', citycode);
    if (postcode) params = params.set('postcode', postcode);

    // On envoie la requête HTTP et on renvoie directement la liste des features (ou un tableau vide).
    return this.http.get<BanResponse>(this.url, { params })
      .pipe(map((response) => response.features ?? []));
  }

}
