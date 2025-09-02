import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import Announcement from '../../../models/announcement.interface';
import DateRange from '../../../models/date-range.interface';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements OnChanges{

  @Input() announcement: Announcement | null = null;
  private unavailableRanges: DateRange[] = [];
  selectedStart: Date | null = null;
  selectedEnd: Date | null = null;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['announcement'] && this.announcement) {
      this.getUnavailableRanges();
      this.showUnavailableInCalendar();
    }
  }

  // Paramettrage du calendar
  calendarOptions: any = {
    // Plugins du calendar
    plugins: [dayGridPlugin, multiMonthPlugin, interactionPlugin],
    initialView: 'multiMonthsix',
    initialDate: new Date(),
    views: {
      multiMonthsix: {
        type: 'multiMonth',
        duration: { months: 6 },
      }
    },
    multiMonthMaxColumns: 3,
    multiMonthMinWidth: 300,
    height: 'auto',
    locales: [frLocale],
    locale: 'fr',
    firstDay: 1,
    fixedWeekCount: false,
    dayHeaderFormat: { weekday: 'narrow' },
    dayMaxEventRows: true,
    eventBackgroundColor: '#fecaca',
    eventBorderColor: '#fecaca',
    displayEventTime: false,
    events: [], // ← evenements à remplir pour afficher les indispo
  };
  
  getUnavailableRanges() {
    this.unavailableRanges = [];
    if (!this.announcement?.reservations) return;

    for (const reservation of this.announcement.reservations) {
      const startDate = new Date(reservation.startDate);
      const endDate = new Date(reservation.endDate);

      this.unavailableRanges.push({ startDate, endDate })
    }
  }

  private showUnavailableInCalendar(): void {
    const events: any[] = [];

    for (const range of this.unavailableRanges) {
      // J'ajoute 1 jour à la date de fin reçu de l'api car full calendar gère les range -> date de début inclu et date de fin exclu
      // Pour avoir également les derniers jour comme non dispo il faut le prendre en compte
      const endDateExclude = new Date(range.endDate);
      endDateExclude.setDate(endDateExclude.getDate() + 1);

      // Ici j'ajoute les dates dans les events du calendar
      events.push({
        start: range.startDate,
        end: endDateExclude,
        allDay: true,
        display: 'background',
      });
    }

    this.calendarOptions.events = events;
  }

}
