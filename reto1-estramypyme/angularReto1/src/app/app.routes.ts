import { Routes } from '@angular/router';
import { CirculoDoradoPageComponent } from './domain/circuloDorado/circulo-dorado-page/circulo-dorado-page.component';
import { RadarEstrategicoPageComponent } from './domain/radarEstrategico/radar-estrategico-page/radar-estrategico-page.component';

export const routes: Routes = [
  { path: '', component: CirculoDoradoPageComponent },
  { path: 'circulo-dorado', component: CirculoDoradoPageComponent },
  { path: 'radar-estrategico', component: RadarEstrategicoPageComponent },
];
