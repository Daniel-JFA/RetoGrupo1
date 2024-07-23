import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { PreguntasService } from '../services/preguntas.service';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';
import Swal from 'sweetalert2';
import { ResultadosCirculoComponent } from '../../resultados/resultados-circulo/resultados-circulo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-preguntas',
  standalone: true,
  imports: [FormsModule, ResultadosCirculoComponent, CommonModule],
  templateUrl: './formulario-preguntas.component.html',
  styleUrl: './formulario-preguntas.component.css',
})
export class FormularioPreguntasComponent implements OnInit, AfterViewInit {
  //Propiedades de la clase o variables que se declaran dentro de una clase)
  valorProgreso: number = 0;
  isPorQueChecked: boolean = true;
  isComoChecked: boolean = false;
  isQueChecked: boolean = false;
  isActive: boolean = true;
  nadaporque: number = 0;
  pocoPorque: number = 0;
  muchoPorue: number = 0;
  contenedorGrafica: any;
  nada: number = 0;
  poco: number = 0;
  mucho: number = 0;

  //Comunica cambios en el estado del componente a otros componentes
  @Output() cambioPregunta = new EventEmitter<number>();
  @Output() respuestaGuardada = new EventEmitter<void>();
  // @Output() reinicioFormulario = new EventEmitter<void>();

  /*"Inyecta el servicio PreguntasService en la clase y crea una propiedad privada preguntaService
  para acceder a sus métodos y propiedades."*/
  constructor(public preguntaService: PreguntasService) {}

  //Cuando el componente se inicializa
  ngOnInit(): void {
    this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta);
  }

  @ViewChild('graficaProgreso') contenedor!: ElementRef;

  ngAfterViewInit(): void {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.actualizarProgreso(this.preguntaService.indexPregunta);
  }

  actualizarProgreso(value: number) {
    this.valorProgreso = this.preguntaService.indexPregunta * 7;

    if (this.valorProgreso > 100) {
      this.valorProgreso = 100;
    }
    const opciones = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '50%'],
          radius: '100%',
          pointer: {
            show: true,
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646',
            },
          },
          axisLine: {
            lineStyle: {
              width: 30,
            },
          },
          splitLine: {
            show: true,
            length: 30,
            lineStyle: {
              color: 'auto',
              width: 2,
            },
          },
          axisTick: {
            show: true,
            splitNumber: 1, // Número de pequeños ticks entre los principales
            length: 15,
            lineStyle: {
              color: 'auto',
              width: 2,
            },
          },
          axisLabel: {
            show: true,
            distance: 30,
            fontSize: 15,
            formatter: function (value: number) {
              if (value % (100 / 15) === 0) {
                return value;
              } else {
                return '';
              }
            },
          },
          data: [
            {
              value: this.valorProgreso,
              name: 'Progreso',
              title: {
                offsetCenter: ['0%', '-30%'],
              },
              detail: {
                offsetCenter: ['0%', '45%'],
              },
            },
          ],
          title: {
            fontSize: 14,
          },
          detail: {
            width: 50,
            height: 14,
            fontSize: 20,
            color: 'auto',
            formatter: '{value}%',
          },
        },
      ],
    };

    if (this.contenedorGrafica) {
      this.contenedorGrafica.setOption(opciones);
    }
  }

  //Método para validar que alguna opción sea seleccionada y así avanzar a la siguiente pregunta
  manejarSiguiente() {
    if (!this.preguntaService.seleccionada) {
      Swal.fire({
        icon: 'error',
        title: 'Selecciona una opción 😒',
      });
      return;
    }
    this.respuestaGuardada.emit();

    // Incrementa el índice de la pregunta para avanzar a la siguiente.
    this.preguntaService.indexPregunta++;

    //emite un evento cambioPregunta con el valor actual de this.indexPregunta como parámetro.
    this.cambioPregunta.emit(this.preguntaService.indexPregunta);

    if (this.preguntaService.indexPregunta == 15) {
      Swal.fire({
        title: "¡Bien hecho, has finalizado todas las secciones' 👏",
        text: '¡Modelo Círculo Dorado completado!🎉',
        // customClass: 'my-custom-class',
      });
      this.preguntaService.indexPregunta = 0;
      this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta);
    }

    if (this.preguntaService.indexPregunta == 5) {
      Swal.fire({
        title: "¡Bien hecho, has terminado la sección '¿Por qué?'! 👏",
        // customClass: 'my-custom-class',
      }).then(() => {
        this.isComoChecked = true;
        this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta);
      });
    } else if (this.preguntaService.indexPregunta == 10) {
      Swal.fire({
        title: "¡Bien hecho, has terminado la sección '¿Cómo?!' 👏",
        // customClass: 'my-custom-class',
      }).then(() => {
        this.isQueChecked = true;
        this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta);
      });
    }
    this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta); // Carga la nueva pregunta.
    this.actualizarProgreso(this.preguntaService.indexPregunta); // Actualiza el progreso.
  }

  manejarAnterior() {
    if (this.preguntaService.indexPregunta > 0) {
      this.preguntaService.indexPregunta--; // Disminuye el índice de la pregunta para retroceder a la anterior.
    }
    this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta); // Carga la nueva pregunta.
    this.actualizarProgreso(this.preguntaService.indexPregunta); // Actualiza el progreso.
  }

  // Guardar la respuesta seleccionada en el servicio
  seleccionarOpcion(indexPregunta: number, respuesta: number) {
    this.preguntaService.guardarRespuesta(indexPregunta, respuesta);
  }
}
