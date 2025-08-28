import { Component } from '@angular/core';
import { AnnouncementDashboardCardComponent } from "../../../../common/announcement-dashboard-card/announcement-dashboard-card.component";

@Component({
  selector: 'app-rental-requests',
  standalone: true,
  imports: [AnnouncementDashboardCardComponent],
  templateUrl: './rental-requests.component.html',
  styleUrl: './rental-requests.component.scss'
})
export class RentalRequestsComponent {

  modalIsOpen = false;

  openModal(){
    this.modalIsOpen = true;
  }

  closeModal(){
    this.modalIsOpen = false
  }

}
