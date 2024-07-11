import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  SimpleChange,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { PreguntasService } from '../preguntas.service';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-preguntas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-preguntas.component.html',
  styleUrl: './formulario-preguntas.component.css',
})
export class FormularioPreguntasComponent implements OnInit {
  //Propiedades de la clase o variables que se declaran dentro de una clase)
  preguntas: any[] = [];
  indexPregunta: number = 0;
  valorProgreso: number = 0;
  objetoPregunta: any;
  opciones: any;
  seleccionada: boolean = true;
  isPorQueChecked: boolean = true;
  isComoChecked: boolean = false;
  isQueChecked: boolean = false;
  isActive: boolean = true;
  nadaporque: number = 0;
  pocoPorque: number = 0;
  muchoPorue: number = 0;

  /*"Inyecta el servicio PreguntasService en la clase y crea una propiedad privada preguntaService
  para acceder a sus métodos y propiedades."*/
  constructor(
    private preguntaService: PreguntasService,
    private cdr: ChangeDetectorRef
  ) {}

  //Cuando el componente se inicializa
  ngOnInit(): void {
    this.preguntas = this.preguntaService.getPreguntas();
    this.cargarPregunta(this.indexPregunta);
  }

  //Cargar cada pregunta del servicio
  cargarPregunta(index: number) {
    if (index < this.preguntas.length) {
      this.seleccionada = false;
      this.objetoPregunta = this.preguntas[index];
      this.opciones = this.objetoPregunta.opciones;
      console.log(`Cargando pregunta con índice: ${index}`);
    } else {
      console.log('No hay más preguntas.');
    }
  }

  //Método para validar que alguna opción sea seleccionada y así avanzar a la siguiente pregunta
  manejarSiguiente() {
    if (!this.seleccionada) {
      Swal.fire({
        icon: 'error',
        title: 'Selecciona una opción 😒',
      });
      return;
    }

    // Incrementa el índice de la pregunta para avanzar a la siguiente.
    this.indexPregunta++;

    if (this.indexPregunta == 5) {
      Swal.fire({
        title: "¡Bien hecho, has terminado la sección '¿Por qué?'! 👏",
        // customClass: 'my-custom-class',
      }).then(() => {
        this.isComoChecked = true;
        this.cargarPregunta(this.indexPregunta);
      });
    } else if (this.indexPregunta == 10) {
      Swal.fire({
        title: "¡Bien hecho, has terminado la sección '¿Cómo?!' 👏",
        // customClass: 'my-custom-class',
      }).then(() => {
        this.isQueChecked = true;
        this.cargarPregunta(this.indexPregunta);
      });
    } else if (this.indexPregunta == 15) {
      Swal.fire({
        title: "¡Bien hecho, has finalizado todas las secciones' 👏",
        text: '¡Modelo Círculo Dorado completado!🎉',
        // customClass: 'my-custom-class',
      }).then(() => {
        this.indexPregunta = 0;
        this.isQueChecked = false;
        this.isPorQueChecked = true;
        this.cargarPregunta(this.indexPregunta);
        this.cdr.detectChanges();
        // this.graficoRespuestas(this.indexPregunta);
      });
    }
    this.cargarPregunta(this.indexPregunta); // Carga la nueva pregunta.
    // this.progreso(this.indexPregunta); // Actualiza el progreso.
    // this.graficoRespuestas(this.indexPregunta); // Actualiza el gráfico de respuestas.
  }

  manejarAnterior() {
    this.indexPregunta--; // Disminuye el índice de la pregunta para retroceder a la anterior.

    this.cargarPregunta(this.indexPregunta); // Carga la nueva pregunta.
    // this.progreso(this.indexPregunta); // Actualiza el progreso.
    // this.graficoRespuestas(this.indexPregunta); // Actualiza el gráfico de respuestas.  }
  }
}
