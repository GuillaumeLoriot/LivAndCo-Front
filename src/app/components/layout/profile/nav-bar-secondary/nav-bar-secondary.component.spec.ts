import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarSecondaryComponent } from './nav-bar-secondary.component';

describe('NavBarSecondaryComponent', () => {
  let component: NavBarSecondaryComponent;
  let fixture: ComponentFixture<NavBarSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarSecondaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
