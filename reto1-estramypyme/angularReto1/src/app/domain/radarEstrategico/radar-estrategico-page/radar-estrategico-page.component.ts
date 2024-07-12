import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FormularioPreguntasRadarComponent } from '../formulario-preguntas-radar/formulario-preguntas-radar.component';
import { GraficaRadarComponent } from '../grafica-radar/grafica-radar.component';

@Component({
  selector: 'app-radar-estrategico-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FormularioPreguntasRadarComponent,
    GraficaRadarComponent,
  ],
  templateUrl: './radar-estrategico-page.component.html',
  styleUrl: './radar-estrategico-page.component.css',
})
export class RadarEstrategicoPageComponent {}
