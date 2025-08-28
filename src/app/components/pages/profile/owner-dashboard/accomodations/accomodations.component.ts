import { Component } from '@angular/core';
import { AccomodationDashboardCardComponent } from "../../../../common/accomodation-dashboard-card/accomodation-dashboard-card.component";

@Component({
  selector: 'app-accomodations',
  standalone: true,
  imports: [AccomodationDashboardCardComponent],
  templateUrl: './accomodations.component.html',
  styleUrl: './accomodations.component.scss'
})
export class AccomodationsComponent {

}
