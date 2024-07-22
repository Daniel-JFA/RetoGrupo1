import { Component, EventEmitter, Input } from '@angular/core';
import { FormularioPreguntasComponent } from '../formulario-preguntas/formulario-preguntas.component';
import { GraficaCirculoComponent } from '../grafica-circulo/grafica-circulo.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-circulo-dorado-page',
  standalone: true,
  imports: [FormularioPreguntasComponent, GraficaCirculoComponent, HeaderComponent],
  templateUrl: './circulo-dorado-page.component.html',
  styleUrl: './circulo-dorado-page.component.css'
})
export class CirculoDoradoPageComponent {
  indexPregunta: number = 0;

  actualizarProgreso(nuevoProgreso: number) {
    this.indexPregunta = nuevoProgreso;
  }

  // @Input() reinicioFormulario: EventEmitter<void> = new EventEmitter<void>();

}
