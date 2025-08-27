import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingReservationsComponent } from './ongoing-reservations.component';

describe('OngoingReservationsComponent', () => {
  let component: OngoingReservationsComponent;
  let fixture: ComponentFixture<OngoingReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingReservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
