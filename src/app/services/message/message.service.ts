import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Message from '../../models/message.interface';
import { enableAuthContext } from '../../interceptors/authentification/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  private apiUrl = `${environment.apiUrl}/messages`;
  private http = inject(HttpClient);


  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl, {
      headers: { 'accept': 'application/json' },
      context: enableAuthContext(),
    });
  }



  // Récupère tous les message du user connecté qui corresponde au user recherché (peer) (traité coté back via une queryExtension)
  getConversation(peerId: number): Observable<Message[]> {

    const params = new HttpParams()
      .set('peer', String(peerId))
      .set('order[createdAt]', 'asc');

    return this.http.get<Message[]>(this.apiUrl, {
      params,
      headers: { accept: 'application/json' },
      // Permet de dire qu'il faut que l'interceptor ajoute le token pour cette requète
      context: enableAuthContext(),
    });
  }

  sendMessage(message: { content: string; receiver: string }): Observable<Message> {
      return this.http.post<Message>(this.apiUrl, message, {
        headers: { 'accept': 'application/json' },
        context: enableAuthContext(),
      });
    }


}
