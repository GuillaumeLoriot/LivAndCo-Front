import { Component, Input } from '@angular/core';
import Accomodation from '../../../models/accomodation.interface';

@Component({
  selector: 'app-accomodation-dashboard-card',
  standalone: true,
  imports: [],
  templateUrl: './accomodation-dashboard-card.component.html',
  styleUrl: './accomodation-dashboard-card.component.scss'
})
export class AccomodationDashboardCardComponent {
@Input() accomodation: Accomodation | null = null;
}
