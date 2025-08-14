import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-review-slider',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './review-slider.component.html',
  styleUrl: './review-slider.component.scss'
})
export class ReviewSliderComponent {

  tests = [1,2,3,4,5,6,7,8,9];

}
