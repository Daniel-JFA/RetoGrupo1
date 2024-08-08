import { Component } from '@angular/core';
import { FormularioPreguntasRadarComponent } from '../formulario-preguntas-radar/formulario-preguntas-radar.component';
import { GraficaRadarComponent } from '../grafica-radar/grafica-radar.component';
import { HeaderComponent } from '../../header/header.component';
import { PreguntasRadarService } from '../services/preguntas-radar.service';
import { FooterComponent } from "../../footer/footer.component";


@Component({
  selector: 'app-radar-estrategico-page',
  standalone: true,
  imports: [
    FormularioPreguntasRadarComponent,
    GraficaRadarComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './radar-estrategico-page.component.html',
  styleUrl: './radar-estrategico-page.component.css',
})
export class RadarEstrategicoPageComponent {
  // graficaRadarComponent: any;

  constructor(private preguntaRadarService: PreguntasRadarService) {
    this.cargarDatosGuardados();
  }

  actualizarNivel({ index, nivel }: { index: number; nivel: number }) {
    switch (index) {
      case 0:
        this.preguntaRadarService.seccion1 = nivel;
        break;
      case 1:
        this.preguntaRadarService.seccion2 = nivel;
        break;
      case 2:
        this.preguntaRadarService.seccion3 = nivel;
        break;
      case 3:
        this.preguntaRadarService.seccion4 = nivel;
        break;
      case 4:
        this.preguntaRadarService.seccion5 = nivel;
        break;
      default:
        break;
    }
    this.guardarDatos();
  }

  guardarDatos() {
    this.preguntaRadarService.guardarDatos();
  }

  cargarDatosGuardados() {
    this.preguntaRadarService.cargarDatosGuardados();
  }
}
