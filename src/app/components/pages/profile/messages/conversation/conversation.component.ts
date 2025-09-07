import { Component, inject } from '@angular/core';
import { MessageService } from '../../../../../services/message/message.service';
import { ActivatedRoute } from '@angular/router';
import Message from '../../../../../models/message.interface';
import { UserService } from '../../../../../services/user/user.service';
import User from '../../../../../models/user.interface';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../common/loading/loading.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlErrorComponent } from "../../../../common/errors/form-control-error/form-control-error.component";

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingComponent, FormControlErrorComponent],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent {


  private messageService = inject(MessageService);
  private userService: UserService = inject(UserService);
  private route = inject(ActivatedRoute);
  messageForm: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  peerId: number | null = null;
  peerUser: User | null = null;
  connectedUser: User | null = null;
  connectedUserId: number | null = null;
  messages: Message[] = [];
  isLoading = false;
  isSubmitted = false;
  error = false;
  errorMessage ='';
  success = false;

  constructor() {
    this.messageForm = this.formBuilder.group({
      message: ['', []],
    });
  }


  ngOnInit(): void {
    this.loadConnectedUser();

    // Ici je regarde le changement d'id dans les paramètres pour charger la conversation corespondante si changement
    this.route.paramMap.subscribe(params => {
      const raw = params.get('id');
      if(raw){
        this.peerId = parseInt(raw);
        this.loadConversation();
      }
    });

  }


  loadConversation() {

    if (this.peerId) {
      this.isLoading = true;
      this.messageService.getConversation(this.peerId).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.messages = data;
          this.getPeerUser()
          console.log(this.messages);
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        }
      });
    }
  }

  loadConnectedUser(){
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (data) => { 
        this.connectedUser = data; 
        this.connectedUserId = data.id;
        this.isLoading = false; 
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }


  getPeerUser(){
    const message = this.messages[0];
    if(message.sender.id === this.peerId){
      this.peerUser = message.sender;
    } else {
      this.peerUser = message.receiver
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    // Je reinitialise les messages d'erreur si besoin
    this.error = false;
    this.success = false;
    this.messageForm.markAllAsTouched();
    if (this.messageForm.valid) {
      this.isLoading = true;
      // Je vérifie bien je j'ai l'id du destinataire à créer un message d'erreur
      if (!this.peerId) {
        this.error = true;
        this.errorMessage = 'Annonce introuvable.';
        this.isLoading = false;
        return;
      }

      // Je prépare les données que je vais transmettre à la méthode de mon service
      const formValue = this.messageForm.value;
      const message = {
        content: formValue.message,
        receiver: '/api/users/'+this.peerId,
      };
      // J'appel mon service pour créer une réservation
      this.messageService.sendMessage(message).subscribe({
        next: (created) => {
          this.messages.push(created)
          this.messageForm.reset();
          this.isSubmitted = false;
          this.isLoading = false;
        },
        error: (error) => {
          // Affichage de l'erreur dans la template
          if (error.status) {
            this.errorMessage = error.error?.message;
          } else {
            this.errorMessage = "Une erreur est survenue lors de l'envoi du message.";
          }
          this.error = true;
          this.isLoading = false;
        },
      });
    }

  }

  }



