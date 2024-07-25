import { Component, EventEmitter, Input } from '@angular/core';
import { FormularioPreguntasComponent } from '../formulario-preguntas/formulario-preguntas.component';
import { GraficaCirculoComponent } from '../grafica-circulo/grafica-circulo.component';
import { HeaderComponent } from '../../header/header.component';
import { PreguntasService } from '../services/preguntas.service';

@Component({
  selector: 'app-circulo-dorado-page',
  standalone: true,
  imports: [
    FormularioPreguntasComponent,
    GraficaCirculoComponent,
    HeaderComponent,
  ],
  templateUrl: './circulo-dorado-page.component.html',
  styleUrl: './circulo-dorado-page.component.css',
})
export class CirculoDoradoPageComponent {
  constructor(public preguntaService: PreguntasService) {}

  actualizarProgreso(nuevoProgreso: number) {
    this.preguntaService.indexPregunta = nuevoProgreso;
  }
}
