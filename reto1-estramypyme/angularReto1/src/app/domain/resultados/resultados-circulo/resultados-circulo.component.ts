import {
  AfterViewInit,
  Component,
  ElementRef,
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
    // Nos suscribimos al servicio de preguntas para obtener las respuestas seleccionadas
    this.subscription = this.preguntaService.indexPregunta$.subscribe(
      (index) => {
        // Llamamos al método para iniciar la gráfica
        this.iniciarGrafica();
      }
    );
  }

  // Método que se ejecuta después de que el componente ha sido inicializado
  ngOnInit() {}

  // Método que se ejecuta después de que el componente ha sido renderizado
  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.iniciarGrafica();
  }

  // Método que se ejecuta cuando el componente es destruido
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Método para obtener las respuestas seleccionadas
  obtenerRespuestasSeleccionadas() {
    // Llamamos al servicio de preguntas para obtener las respuestas seleccionadas
    const respuestasSeleccionadas = this.preguntaService.getRespuestas();
    return respuestasSeleccionadas;
  }

  // Método para generar la conclusión basada en las respuestas procesadas
  generarConclusión(respuestasProcesadas: any) {
    // Variables para almacenar las cuentas de respuestas
    const nada = respuestasProcesadas['nada'];
    const poco = respuestasProcesadas['poco'];
    const mucho = respuestasProcesadas['mucho'];

    // Analizar las respuestas por sección
    for (let i = 0; i < 3; i++) {
      // Calculamos las cuentas de respuestas para cada sección
      const nadaCount = nada[i].reduce((a: any, b: any) => a + b, 0);
      const pocoCount = poco[i].reduce((a: any, b: any) => a + b, 0);
      const muchoCount = mucho[i].reduce((a: any, b: any) => a + b, 0);

      // Generamos la conclusión basada en las cuentas de respuestas
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
    return this.conclusiones;
  }

  // Método para procesar las respuestas seleccionadas
  procesarRespuestas(respuestasSeleccionadas: any) {
    // Variables para almacenar las cuentas de respuestas
    const nada = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const poco = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const mucho = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    // Recorremos las respuestas seleccionadas y actualizamos las cuentas
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
    // Retornamos las cuentas de respuestas procesadas
    return { nada, poco, mucho };
  }

  // Método para iniciar la gráfica
  iniciarGrafica() {
    // Obtenemos las respuestas seleccionadas
    const respuestasSeleccionadas = this.obtenerRespuestasSeleccionadas();
    // Procesamos las respuestas seleccionadas
    const respuestasProcesadas = this.procesarRespuestas(
      respuestasSeleccionadas
    );
    // Creamos las opciones de la gráfica
    const opcionesGrafica = this.crearOpcionesGrafica(
      respuestasProcesadas['nada'],
      respuestasProcesadas['poco'],
      respuestasProcesadas['mucho']
    );
    // Configuramos la gráfica con las opciones creadas
    this.configurarGrafica(opcionesGrafica);
    // Generamos la conclusión basada en las respuestas procesadas
    const conclusion = this.generarConclusión(respuestasProcesadas);
    // Asignamos la conclusión a una variable que se mostrará en el HTML
    this.conclusiones = conclusion; // Asigna el mensaje a una variable que se muestre en el HTML
  }

  // Método para crear las opciones de la gráfica
  crearOpcionesGrafica(nada: number[][], poco: number[][], mucho: number[][]) {
    // Definimos las categorías de la gráfica
    const categorias = ['¿Por qué?', '¿Cómo?', '¿Qué?'];

    // Definimos las opciones de la gráfica
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
    // Retornamos las opciones de la gráfica
    return opciones;
  }

  // Método para configurar la gráfica
  configurarGrafica(opcionesGrafica: any) {
    // Configuramos la gráfica con las opciones creadas
    this.contenedorGrafica.setOption(opcionesGrafica);
  }
}
