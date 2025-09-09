import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from "@angular/router";
import Announcement from '../../../models/announcement.interface';
import { AverageMonthlyPipe } from '../../../pipes/average-monthly.pipe';

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [RouterLink, AverageMonthlyPipe],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss'
})
export class ReservationCardComponent implements OnInit{

  @Input() announcement: Announcement | null = null;
  
  ownerId:number | null = null;

ngOnInit(): void {
  if(this.announcement){
    this.ownerId = this.announcement.accomodation.owner.id;
  }
  
}


}
