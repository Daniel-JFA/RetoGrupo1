import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';
import { PreguntasService } from '../../circuloDorado/services/preguntas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resultados-circulo',
  standalone: true,
  imports: [],
  templateUrl: './resultados-circulo.component.html',
  styleUrl: './resultados-circulo.component.css',
})
export class ResultadosCirculoComponent implements AfterViewInit, OnDestroy {
  contenedorGrafica: any;
  conclusiones: any = [];
  private subscription: Subscription;

  @ViewChild('resultadosCirculo') contenedor!: ElementRef;

  constructor(public preguntaService: PreguntasService) {
    this.subscription = this.preguntaService.indexPregunta$.subscribe(
      (index) => {
        this.iniciarGrafica();
      }
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.iniciarGrafica();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  obtenerRespuestasSeleccionadas() {
    const respuestasSeleccionadas = this.preguntaService.getRespuestas();
    return respuestasSeleccionadas;
  }

  generarConclusión(respuestasProcesadas: any) {
    const nada = respuestasProcesadas['nada'];
    const poco = respuestasProcesadas['poco'];
    const mucho = respuestasProcesadas['mucho'];

    // Analizar las respuestas por sección
    for (let i = 0; i < 3; i++) {
      const nadaCount = nada[i].reduce((a: any, b: any) => a + b, 0);
      const pocoCount = poco[i].reduce((a: any, b: any) => a + b, 0);
      const muchoCount = mucho[i].reduce((a: any, b: any) => a + b, 0);

      if ((nadaCount >= 2 || pocoCount >= 2) && muchoCount < 3) {
        this.conclusiones.push(
          `Es importante crear una estrategia para mejorar su empresa`
        );
      } else if (muchoCount >= 3) {
        this.conclusiones.push(
          `Las respuestas reflejan que todo está perfectamente estructurado y cumple con los objetivos ¡Felicitaciones! 👏`
        );
      }
    }
    // Filtra las conclusiones vacías y devuelve un array con las conclusiones
    return this.conclusiones;
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
    const conclusion = this.generarConclusión(respuestasProcesadas);
    this.conclusiones = conclusion; // Asigna el mensaje a una variable que se muestre en el HTML
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
    return opciones;
  }
  configurarGrafica(opcionesGrafica: any) {
    this.contenedorGrafica.setOption(opcionesGrafica);
  }
}
