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
  contenedorGrafica: any;

  @ViewChild('resultadosCirculo') contenedor!: ElementRef;

  constructor(public preguntaService: PreguntasService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.iniciarGrafica();
  }

  obtenerRespuestasSeleccionadas() {
    const respuestasSeleccionadas = this.preguntaService.getRespuestas();
    console.log('Respuestas seleccionadas:', respuestasSeleccionadas);
    return respuestasSeleccionadas;
  }

  procesarRespuestas(respuestasSeleccionadas: any) {
    const nada = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]; // ¿Por qué?, ¿Cómo?, ¿Qué?
    const poco = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]; // ¿Por qué?, ¿Cómo?, ¿Qué?
    const mucho = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]; // ¿Por qué?, ¿Cómo?, ¿Qué?

    for (const clave in respuestasSeleccionadas) {
      const respuesta = respuestasSeleccionadas[clave];
      const seccion = Math.floor(parseInt(clave) / 5); // Calcular la sección (0, 1 o 2)
      const pregunta = parseInt(clave) % 5; // Calcular la pregunta dentro de la sección (0, 1, 2, 3 o 4)
      switch (respuesta) {
        case 'Nada':
          nada[seccion][pregunta]++; // Incrementar la cuenta correspondiente en nada
          break;
        case 'Poco':
          poco[seccion][pregunta]++; // Incrementar la cuenta correspondiente en poco
          break;
        case 'Mucho':
          mucho[seccion][pregunta]++; // Incrementar la cuenta correspondiente en mucho
          break;
      }
      console.log('Datos procesados:', { nada, poco, mucho });
    }
    return { nada, poco, mucho };
  }

  iniciarGrafica() {
    const respuestasSeleccionadas = this.obtenerRespuestasSeleccionadas();
    const respuestasProcesadas = this.procesarRespuestas(
      respuestasSeleccionadas
    );
    const opcionesGrafica = this.crearOpcionesGrafica(
      respuestasProcesadas['nada'],
      respuestasProcesadas['poco'],
      respuestasProcesadas['mucho']
    );
    this.configurarGrafica(opcionesGrafica);
  }

  crearOpcionesGrafica(nada: number[][], poco: number[][], mucho: number[][]) {
    const categorias = ['¿Por qué?', '¿Cómo?', '¿Qué?'];

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
          data: [
            nada[0].reduce((a, b) => a + b, 0),
            nada[1].reduce((a, b) => a + b, 0),
            nada[2].reduce((a, b) => a + b, 0),
          ],
        },
        {
          name: 'Poco',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: [
            poco[0].reduce((a, b) => a + b, 0),
            poco[1].reduce((a, b) => a + b, 0),
            poco[2].reduce((a, b) => a + b, 0),
          ],
        },
        {
          name: 'Mucho',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: [
            mucho[0].reduce((a, b) => a + b, 0),
            mucho[1].reduce((a, b) => a + b, 0),
            mucho[2].reduce((a, b) => a + b, 0),
          ],
        },
      ],
    };
    console.log('Opciones de gráfica:', opciones);
    return opciones;
  }
  configurarGrafica(opcionesGrafica: any) {
    this.contenedorGrafica.setOption(opcionesGrafica);
    console.log('Gráfica configurada correctamente');
  }
}
