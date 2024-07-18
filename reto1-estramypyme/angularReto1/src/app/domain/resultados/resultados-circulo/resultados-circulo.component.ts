import { AfterViewInit, Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
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
  contenedorGrafica: any;

  @ViewChild('resultadosCirculo') contenedor!: ElementRef;
  @Input() respuestaGuardada: EventEmitter<void> = new EventEmitter<void>();

  constructor(private preguntaService: PreguntasService) {}

  ngOnInit() {
    this.respuestaGuardada.subscribe(() => {
      this.iniciarGrafica();
    });
  }

  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.iniciarGrafica();
  }

  iniciarGrafica() {
    const respuestas = this.preguntaService.getRespuestas();

    const categorias = ['¿Por qué?', '¿Cómo?', '¿Qué?'];
    const nada = [0, 0, 0];
    const poco = [0, 0, 0];
    const mucho = [0, 0, 0];


    // for (let index = 0; index < respuestas.length; index++) {
    //   const sectionIndex = Math.floor(index / 5);
    //   if (respuestas[index] === 0) {
    //     nada[sectionIndex] += 1;
    //   } else if (respuestas[index] === 1) {
    //     poco[sectionIndex] += 1;
    //   } else if (respuestas[index] === 2) {
    //     mucho[sectionIndex] += 1;
    //   }
    // }
    

    respuestas.forEach((respuesta, index) => {
      const sectionIndex = Math.floor(index / 5);
      if (index === 0) {
        nada[sectionIndex] += 1;
      } else if (index === 1) {
        poco[sectionIndex] += 1;
      } else if (index === 2) {
        mucho[sectionIndex] += 1;
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
