import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementListCardComponent } from './announcement-list-card.component';

describe('AnnouncementListCardComponent', () => {
  let component: AnnouncementListCardComponent;
  let fixture: ComponentFixture<AnnouncementListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
