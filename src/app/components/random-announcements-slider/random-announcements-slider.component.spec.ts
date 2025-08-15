import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomAnnouncementsSliderComponent } from './random-announcements-slider.component';

describe('RandomAnnouncementsSliderComponent', () => {
  let component: RandomAnnouncementsSliderComponent;
  let fixture: ComponentFixture<RandomAnnouncementsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomAnnouncementsSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomAnnouncementsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
