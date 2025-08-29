import { Component } from '@angular/core';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'app-results-map',
  standalone: true,
  imports: [NgxMapLibreGLModule],
  templateUrl: './results-map.component.html',
  styleUrl: './results-map.component.scss'
})
export class ResultsMapComponent {

}
