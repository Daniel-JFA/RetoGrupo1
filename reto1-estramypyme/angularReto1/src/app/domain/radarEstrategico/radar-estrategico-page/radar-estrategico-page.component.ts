import { Component } from '@angular/core';
import { FormularioPreguntasRadarComponent } from '../formulario-preguntas-radar/formulario-preguntas-radar.component';
import { GraficaRadarComponent } from '../grafica-radar/grafica-radar.component';

@Component({
  selector: 'app-radar-estrategico-page',
  standalone: true,
  imports: [
    FormularioPreguntasRadarComponent,
    GraficaRadarComponent,
  ],
  templateUrl: './radar-estrategico-page.component.html',
  styleUrl: './radar-estrategico-page.component.css',
})
export class RadarEstrategicoPageComponent {
  nivel1: number = 1;
  nivel2: number = 1;
  nivel3: number = 1;
  nivel4: number = 1;
  nivel5: number = 1;

  actualizarNivel({ nivel, index }: { nivel: number, index: number }) {
    switch (index) {
      case 0:
        this.nivel1 = nivel;
        break;
      case 1:
        this.nivel2 = nivel;
        break;
      case 2:
        this.nivel3 = nivel;
        break;
      case 3:
        this.nivel4 = nivel;
        break;
      case 4:
        this.nivel5 = nivel;
        break;
      default:
        break;
    }
  }
}
