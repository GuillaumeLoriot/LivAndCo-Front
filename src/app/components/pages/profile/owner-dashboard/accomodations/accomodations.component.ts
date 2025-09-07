import { Component } from '@angular/core';
import { AccomodationDashboardCardComponent } from "../../../../common/accomodation-dashboard-card/accomodation-dashboard-card.component";
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../common/loading/loading.component';

@Component({
  selector: 'app-accomodations',
  standalone: true,
  imports: [CommonModule ,AccomodationDashboardCardComponent, LoadingComponent],
  templateUrl: './accomodations.component.html',
  styleUrl: './accomodations.component.scss'
})
export class AccomodationsComponent {

}
