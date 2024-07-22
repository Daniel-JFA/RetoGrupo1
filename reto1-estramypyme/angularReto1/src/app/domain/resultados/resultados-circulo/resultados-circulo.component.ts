import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';
import { PreguntasService } from '../../circuloDorado/services/preguntas.service';
import { style } from '@angular/animations';

@Component({
  selector: 'app-resultados-circulo',
  standalone: true,
  imports: [],
  templateUrl: './resultados-circulo.component.html',
  styleUrl: './resultados-circulo.component.css',
})
export class ResultadosCirculoComponent implements AfterViewInit {
  preguntas: any[] = [];
  opciones: any;
  respuestas: any = {};
  objetoPregunta: any;
  contenedorGrafica: any;

  @ViewChild('resultadosCirculo') contenedor!: ElementRef;
  @Input() respuestaGuardada: EventEmitter<void> = new EventEmitter<void>();
  // @Input() reinicioFormulario: EventEmitter<void> = new EventEmitter<void>();

  constructor(private preguntaService: PreguntasService) {}

  ngOnInit() {
    this.preguntas = this.preguntaService.getPreguntas();
    this.cargarRespuestas();
    this.respuestaGuardada.subscribe(() => {
      this.iniciarGrafica();
    });
  }

  cargarPregunta(index: number) {
    this.objetoPregunta = this.preguntas[index];
    this.opciones = this.objetoPregunta.opciones;
  }

  cargarRespuestas(): void {
    const respuestasGuardadas = localStorage.getItem('respuestas');
    if (respuestasGuardadas) {
      this.respuestas = JSON.parse(respuestasGuardadas);
    }
  }

  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.iniciarGrafica();
  }

  iniciarGrafica() {
    const seccion = this.preguntaService.getRespuestas();

    const categorias = ['¿Por qué?', '¿Cómo?', '¿Qué?'];
    const nada = [0, 0, 0];
    const poco = [0, 0, 0];
    const mucho = [0, 0, 0];


    seccion.forEach((seccion, indexPregunta) => {
      const seccionIndex = Math.floor(indexPregunta / 5);

      if (seccion === 0) {
        nada[seccionIndex] += 1;
      } else if (seccion === 1) {
        poco[seccionIndex] += 1;
      } else if (seccion === 2) {
        mucho[seccionIndex] += 1;
      }
    });

    const opciones = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Nada' , 'Poco', 'Mucho'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: categorias,
        itemStyle: {
          color: '#a90000',
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Nada',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: nada,
          
        },
        {
          name: 'Poco',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: poco,
        },
        {
          name: 'Mucho',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: mucho,
        },
      ],
    };
    this.contenedorGrafica.setOption(opciones);
  }
}
