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
  isPorQueChecked!: boolean;
  isComoChecked!: boolean;
  isQueChecked!: boolean;
  valorProgreso: number = 0;
  isActive: boolean = true;
  nadaporque: number = 0;
  pocoPorque: number = 0;
  muchoPorue: number = 0;
  contenedorGrafica: any;
  nada: number = 0;
  poco: number = 0;
  mucho: number = 0;

  // Eventos que se emiten hacia otros componentes
  @Output() cambioPregunta = new EventEmitter<number>();
  @Output() respuestaGuardada = new EventEmitter<void>();
  @ViewChild('graficaProgreso') contenedor!: ElementRef;

  // Servicio de preguntas inyectado en el componente
  constructor(public preguntaService: PreguntasService) {
    this.preguntaService.radioValue = ''; // Inicializa el valor de la respuesta seleccionada
  }

  // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.preguntaService.cargarEstadoFormulario(); // Carga el estado del formulario
    this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta); // Carga la primera pregunta
    this.preguntaService.cargarRespuestas(); // Carga las respuestas
    this.recuperarEstadoCheckboxes(); // Recupera el estado de los checkboxes
  }

  // Método que se ejecuta cuando se resetean los radio inputs
  resetearRadioInputs() {
    this.preguntaService.radioValue = ''; // Resetear el valor de la respuesta seleccionada
  }

  // Método que guarda el estado de los checkboxes en LocalStorage
  guardarEstadoCheckboxes() {
    const estadoCheckboxes = {
      isPorQueChecked: this.isPorQueChecked,
      isComoChecked: this.isComoChecked,
      isQueChecked: this.isQueChecked,
    };
    localStorage.setItem('estadoCheckboxes', JSON.stringify(estadoCheckboxes));
  }

  // Método que recupera el estado de los checkboxes desde LocalStorage
  recuperarEstadoCheckboxes() {
    const estadoCheckboxes = localStorage.getItem('estadoCheckboxes');
    if (estadoCheckboxes) {
      const estado = JSON.parse(estadoCheckboxes);
      this.isPorQueChecked = estado.isPorQueChecked;
      this.isComoChecked = estado.isComoChecked;
      this.isQueChecked = estado.isQueChecked;
    }
  }

  // Método que se ejecuta después de que el componente se ha inicializado
  ngAfterViewInit(): void {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.actualizarProgreso(this.preguntaService.indexPregunta);
  }

  // Método que actualiza el progreso de la barra de progreso
  actualizarProgreso(value: number) {
    this.valorProgreso = this.preguntaService.indexPregunta * 8;

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

  // Método para validar que alguna opción sea seleccionada y así avanzar a la siguiente pregunta
  manejarSiguiente() {
    if (!this.preguntaService.radioValue) {
      Swal.fire({
        icon: 'error',
        title: 'Selecciona una opción 😒',
        customClass: {
          confirmButton: 'my-swal-button',
        },
      });
      return;
    }
    this.respuestaGuardada.emit();

    // Incrementa el índice de la pregunta para avanzar a la siguiente.
    this.preguntaService.guardarEstadoFormulario();
    this.preguntaService.indexPregunta++;
    this.resetearRadioInputs();

    //emite un evento cambioPregunta con el valor actual de this.indexPregunta como parámetro.
    this.cambioPregunta.emit(this.preguntaService.indexPregunta);

    if (this.preguntaService.indexPregunta == 5) {
      Swal.fire({
        title: "¡Bien hecho, has terminado la sección '¿Por qué?'! 👏",
        customClass: {
          confirmButton: 'my-swal-button',
        },
      }).then(() => {
        this.isComoChecked = true;
        this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta);
      });
    } else if (this.preguntaService.indexPregunta == 10) {
      Swal.fire({
        title: "¡Bien hecho, has terminado la sección '¿Cómo?!' 👏",
        customClass: {
          confirmButton: 'my-swal-button',
        },
      }).then(() => {
        this.isQueChecked = true;
        this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta);
      });
    } else if (this.preguntaService.indexPregunta == 15) {
      Swal.fire({
        title: "¡Bien hecho, has finalizado todas las secciones' 👏",
        text: '¡Modelo Círculo Dorado completado!🎉',
        customClass: {
          confirmButton: 'my-swal-button',
        },
      }).then(() => {
        this.preguntaService.indexPregunta = 0;
        this.isPorQueChecked = true;
        this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta);
      });
    }

    this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta); // Carga la nueva pregunta.
    this.actualizarProgreso(this.preguntaService.indexPregunta); // Actualiza el progreso.
  }

  // Método para volver a la pregunta anterior
  manejarAnterior() {
    if (this.preguntaService.indexPregunta > 0) {
      this.preguntaService.indexPregunta--; // Disminuye el índice de la pregunta para retroceder a la anterior.
    }
    this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta); // Carga la nueva pregunta.
    this.actualizarProgreso(this.preguntaService.indexPregunta); // Actualiza el progreso.
  }

  // Guardar la respuesta seleccionada en el servicio
  seleccionarOpcion(indexPregunta: number, respuesta: string) {
    this.preguntaService.guardarRespuesta(indexPregunta, respuesta);
    this.preguntaService.radioValue = respuesta;
    this.guardarEstadoCheckboxes();
  }
}
