import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-random-announcements-slider',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './random-announcements-slider.component.html',
  styleUrl: './random-announcements-slider.component.scss'
})
export class RandomAnnouncementsSliderComponent {

  tests2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

}
