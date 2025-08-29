import { Component } from '@angular/core';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';

@Component({
  selector: 'app-results-map',
  standalone: true,
  imports: [NgxMapLibreGLModule],
  templateUrl: './results-map.component.html',
  styleUrl: './results-map.component.scss'
})
export class ResultsMapComponent {

  mapStyle: StyleSpecification = {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap',
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm',
        paint: {
          'raster-brightness-max': 0.9,
          'raster-saturation': 0.1,
          'raster-contrast': 0.2,
        },
      },
    ],
  };

}
