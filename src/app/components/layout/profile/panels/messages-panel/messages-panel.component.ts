import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PanelStateService } from '../../../../../services/utils/panel-state.service';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../../../services/message/message.service';
import User from '../../../../../models/user.interface';
import Message from '../../../../../models/message.interface';
import { UserService } from '../../../../../services/user/user.service';

@Component({
  selector: 'app-messages-panel',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

    this.messageService.getMessages().subscribe({
      next: (messages: Message[]) => {
        const uniquePeersById = new Map<number, User>();

        for (const message of messages) {
          const other =
            message.sender?.id === myId ? message.receiver :
              message.receiver?.id === myId ? message.sender : null;

          if (other && !uniquePeersById.has(other.id)) {
            uniquePeersById.set(other.id, other);
          }
        }

        this.peers = Array.from(uniquePeersById.values());
        console.log(this.peers)
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
