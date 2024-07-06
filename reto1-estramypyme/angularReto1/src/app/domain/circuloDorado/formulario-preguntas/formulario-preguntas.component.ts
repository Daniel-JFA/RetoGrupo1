import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
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
  preguntas: any[] = [];
  indexPregunta: number = 0;
  valorProgreso: number = 0;
  objetoPregunta: any;
  opciones: any;
  seleccionada: boolean = true;
  chart: any;
  isPorQueChecked: boolean = true;
  isComoChecked: boolean = false;
  isQueChecked: boolean = false;

  constructor(private preguntaService: PreguntasService) {}

  ngOnInit(): void {
    this.preguntas = this.preguntaService.getPreguntas();
    this.cargarPregunta(this.indexPregunta);
  }

  cargarPregunta(index: number) {
    this.seleccionada = false;
    this.objetoPregunta = this.preguntas[index];
    this.opciones = this.objetoPregunta.opciones;
  }

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
        // indexPregunta = 5; // Eliminado
        this.isComoChecked = true;
        this.cargarPregunta(this.indexPregunta);
      });
    } else if (this.indexPregunta == 10) {
      Swal.fire({
        title: "¡Bien hecho, has terminado la sección '¿Cómo?!' 👏",
        // customClass: 'my-custom-class',
      }).then(() => {
        // indexPregunta = 10; // Eliminado
        this.isQueChecked = true;
        this.cargarPregunta(this.indexPregunta);
      });
    } else if (this.indexPregunta >= 15) {
      Swal.fire({
        title: "¡Bien hecho, has finalizado todas las secciones' 👏",
        text: '¡Modelo Círculo Dorado completado!🎉',
        // customClass: 'my-custom-class',
      }).then(() => {
        this.indexPregunta = 0;
        this.cargarPregunta(this.indexPregunta);
        // this.graficoRespuestas(this.indexPregunta);
      });
    }
    this.cargarPregunta(this.indexPregunta); // Carga la nueva pregunta.
    this.progreso(this.indexPregunta); // Actualiza el progreso.
    // this.graficoRespuestas(this.indexPregunta); // Actualiza el gráfico de respuestas.
  }

  manejarAnterior() {
    this.indexPregunta--; // Disminuye el índice de la pregunta para retroceder a la anterior.

    this.cargarPregunta(this.indexPregunta); // Carga la nueva pregunta.
    this.progreso(this.indexPregunta); // Actualiza el progreso.
    // this.graficoRespuestas(this.indexPregunta); // Actualiza el gráfico de respuestas.  }
  }

  progreso(_index: number) {
    
    this.valorProgreso = this.indexPregunta * 7;
    if (this.valorProgreso > 100) {
      this.valorProgreso = 100;
    }

    var option = {
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

    // window.addEventListener("resize", function () {
    //   myChart.resize();
    // });
    this.chart.setOption(option);
  }
}
