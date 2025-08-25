import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementDashboardCardComponent } from './announcement-dashboard-card.component';

describe('AnnouncementDashboardCardComponent', () => {
  let component: AnnouncementDashboardCardComponent;
  let fixture: ComponentFixture<AnnouncementDashboardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementDashboardCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementDashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
