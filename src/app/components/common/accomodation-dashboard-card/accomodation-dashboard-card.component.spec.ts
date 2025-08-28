import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationDashboardCardComponent } from './accomodation-dashboard-card.component';

describe('AccomodationDashboardCardComponent', () => {
  let component: AccomodationDashboardCardComponent;
  let fixture: ComponentFixture<AccomodationDashboardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccomodationDashboardCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccomodationDashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
