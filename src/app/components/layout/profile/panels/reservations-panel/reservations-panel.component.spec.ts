import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsPanelComponent } from './reservations-panel.component';

describe('ReservationsPanelComponent', () => {
  let component: ReservationsPanelComponent;
  let fixture: ComponentFixture<ReservationsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
