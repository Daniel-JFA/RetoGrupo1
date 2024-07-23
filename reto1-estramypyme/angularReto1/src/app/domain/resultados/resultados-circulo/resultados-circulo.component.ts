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

@Component({
  selector: 'app-resultados-circulo',
  standalone: true,
  imports: [],
  templateUrl: './resultados-circulo.component.html',
  styleUrl: './resultados-circulo.component.css',
})
export class ResultadosCirculoComponent implements AfterViewInit {
  opciones: any;
  respuestas: any = {};
  objetoPregunta: any;
  contenedorGrafica: any;
  nada: number[] = [0, 0, 0];
  poco: number[] = [0, 0, 0];
  mucho: number[] = [0, 0, 0];

  @ViewChild('resultadosCirculo') contenedor!: ElementRef;
  // @Input() reinicioFormulario: EventEmitter<void> = new EventEmitter<void>();

  constructor(public preguntaService: PreguntasService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.iniciarGrafica();
  }

  iniciarGrafica() {
    const respuestasSeleccionadas = this.preguntaService.getRespuestas();

    const categorias = ['¿Por qué?', '¿Cómo?', '¿Qué?'];
    this.nada = [0, 0, 0];
    this.poco = [0, 0, 0];
    this.mucho = [0, 0, 0];

    if (respuestasSeleccionadas[0] === 'Nada') {
      this.nada[0]++;
    }

    const opciones = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Nada', 'Poco', 'Mucho'],
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
          data: this.nada,
        },
        {
          name: 'Poco',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: this.poco,
        },
        {
          name: 'Mucho',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: this.mucho,
        },
      ],
    };
    this.contenedorGrafica.setOption(opciones);
  }
}
