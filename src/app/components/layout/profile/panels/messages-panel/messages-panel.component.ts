import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PanelStateService } from '../../../../../services/utils/panel-state.service';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../../../services/message/message.service';
import User from '../../../../../models/user.interface';
import Message from '../../../../../models/message.interface';
import { UserService } from '../../../../../services/user/user.service';
import { LoadingComponent } from "../../../../common/loading/loading.component";

@Component({
  selector: 'app-messages-panel',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  templateUrl: './messages-panel.component.html',
  styleUrl: './messages-panel.component.scss'
})
export class MessagesPanelComponent implements OnInit{


  private messageService = inject(MessageService);
  private userService = inject(UserService);

  peers: User[] = [];
  isLoading = false;
  error = false;
  errorMessage: string | null = null;
  connectedUser: User | null = null;
  myId!: number;

  constructor(public panelState: PanelStateService) { }


  ngOnInit(): void {
    this.loadUser();
    
  }

  loadDistinctPeers(myId: number): void {
    this.isLoading = true;

    // Je récupère tous les messages du user connecté (filtrés côté back)
    this.messageService.getMessages().subscribe({
      next: (messages: Message[]) => {

        // J'utiliserai Map pour dédupliquer les correspondants par leur id
        // clé = peer.id, valeur = l'objet User correspondant
        const uniquePeersById = new Map<number, User>();

        // Parcourt tous les messages retournés
        for (const message of messages) {
          // Je détermine "l'autre" participant du message par rapport à mon id
          // - si je suis l'émetteur (sender), l'autre est le destinataire (receiver)
          // - si je suis le destinataire (receiver), l'autre est l'émetteur (sender)
          let other: User | null = null;

          if (message.sender?.id === myId) {
            other = message.receiver;
          } else if (message.receiver?.id === myId) {
            other = message.sender;
          }

          // J'ajoute le correspondant (other) dans la Map uniquement s'il n'y est pas déjà
          if (other && !uniquePeersById.has(other.id)) {
            uniquePeersById.set(other.id, other);
          }
        }

        // Je convertit la Map en tableau de correspondants uniques pour la vue
        this.peers = Array.from(uniquePeersById.values());

        console.log(this.peers);
        this.isLoading = false;
      },
      error: () => {
        this.error = true;
        this.isLoading = false;
      }
    });
  }


  loadUser() {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (data) => { 
        this.connectedUser = data; 
        this.myId = data.id;
        console.log(this.connectedUser);
        this.loadDistinctPeers(this.myId); 
        this.isLoading = false; },
      error: (error) => {
        // Affichage de l'erreur dans la template
        if (error.status) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        }
        this.error = true;
        this.isLoading = false;
      }
    });
  }

}
