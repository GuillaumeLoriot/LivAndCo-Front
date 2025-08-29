import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

export type DateRange = { start: string | Date; end: string | Date };

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements OnChanges {
  @Input() unavailableRanges: DateRange[] = [];
  
  calendarOptions: any = {
    // ✅ Déclare les plugins ici
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
    selectable: false,
    events: [],
    eventBackgroundColor: '#fecaca',
    eventBorderColor: '#fecaca',
    displayEventTime: false,
  };

  ngOnChanges(): void {
    const events = (this.unavailableRanges || []).map(r => {
      const start = toISODate(r.start);
      const endExclusive = addDays(toDate(r.end), 1); // end EXCLUSIVE => +1 jour
      return {
        start,
        end: toISODate(endExclusive),
        display: 'background',
        overlap: true,
        backgroundColor: '#fecaca',
        borderColor: '#fecaca',
      };
    });

    this.calendarOptions = {
      ...this.calendarOptions,
      events,
    };
  }
}

/* Helpers */
function toDate(d: string | Date): Date {
  return d instanceof Date ? new Date(d) : new Date(d);
}
function addDays(d: Date, days: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}
function toISODate(d: string | Date): string {
  const x = toDate(d);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, '0');
  const dd = String(x.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}
