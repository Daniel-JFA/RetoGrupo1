import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PreguntasRadarService } from '../services/preguntas-radar.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-preguntas-radar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formulario-preguntas-radar.component.html',
  styleUrls: ['./formulario-preguntas-radar.component.css'],
})
export class FormularioPreguntasRadarComponent implements OnInit {
  @Output() nivelSeleccionado = new EventEmitter<{
    index: number;
    nivel: number;
  }>();
  //Propiedades de la clase o variables que se declaran dentro de una clase)


  /*"Inyecta el servicio PreguntasRadarService en la clase y crea una propiedad privada preguntaRadarService
  para acceder a sus métodos y propiedades."*/
  constructor(public preguntaRadarService: PreguntasRadarService) {}



  //Cuando el componente se inicializa
  ngOnInit(): void {
    this.preguntaRadarService.recuperarIndicePregunta();
    this.preguntaRadarService.BasepreguntasRadar = this.preguntaRadarService.getPreguntasRadar();
    console.log(this.preguntaRadarService.cargarPreguntaRadar(this.preguntaRadarService.indexPregunta));
  }

 

  /*"Establece la opción seleccionada en la propiedad preguntaSeleccionada y la muestra en la consola.*/
  seleccionarOpcion(nivel: any, descripcion: any) {
    this.preguntaRadarService.preguntaSeleccionada = { nivel, descripcion };
    console.log(     this.nivelSeleccionado.emit({ index: this.preguntaRadarService.indexPregunta, nivel }));
    console.log(this.preguntaRadarService.preguntaSeleccionada);
  }

  //Método para validar que alguna opción sea seleccionada y así avanzar a la siguiente pregunta
  manejarSiguiente() {
    if (!this.preguntaRadarService.preguntaSeleccionada) {
      Swal.fire({
        icon: 'error',
        title: 'Selecciona una opción 😒',
      });
      return;
    }

    this.preguntaRadarService.indexPregunta++;
    this.preguntaRadarService.guardarIndicePregunta();
    this.preguntaRadarService.cargarPreguntaRadar(this.preguntaRadarService.indexPregunta);
  }

  manejarAnterior() {
    if (this.preguntaRadarService.indexPregunta > 0) {
      this.preguntaRadarService.indexPregunta--; // Disminuye el índice de la pregunta para retroceder a la anterior.
    }
    this.preguntaRadarService.guardarIndicePregunta();

    this.preguntaRadarService.cargarPreguntaRadar(this.preguntaRadarService.indexPregunta); // Carga la nueva pregunta.
  }


}
