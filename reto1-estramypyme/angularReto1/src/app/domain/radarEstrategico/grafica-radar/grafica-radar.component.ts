import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import * as echarts from 'echarts';
import { PreguntasRadarService } from '../services/preguntas-radar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grafica-radar',
  standalone: true,
  templateUrl: './grafica-radar.component.html',
  styleUrls: ['./grafica-radar.component.css'],
})
export class GraficaRadarComponent implements AfterViewInit, OnDestroy {
  contenedorGrafica: any;
  // Suscripción a los eventos del servicio PreguntasRadarService.
  private subscription: Subscription;

  @ViewChild('graficaRadar', { static: true }) contenedor!: ElementRef;

  // Inyecta el servicio PreguntasRadarService en la clase
  constructor(public preguntaRadarService: PreguntasRadarService) {
    // Crea una nueva suscripción a los eventos del servicio PreguntasRadarService
    this.subscription = new Subscription();
    // Agrega una suscripción al evento indexPregunta$ del servicio PreguntasRadarService
    this.subscription.add(
      this.preguntaRadarService.indexPregunta$.subscribe((index) => {
        this.updateGrafica();
      })
    );

    // Agrega una suscripción al evento respuestasReiniciadas$ del servicio PreguntasRadarService
    this.subscription =
      this.preguntaRadarService.respuestasReiniciadas$.subscribe(
        (reiniciadas) => {
          // Actualiza la gráfica cuando se reinician las respuestas.
          if (reiniciadas) {
            this.updateGrafica();
          }
        }
      );
  }
  // Se ejecuta cuando el componente se destruye.
  ngOnDestroy(): void {
    // Cancela la suscripción a los eventos del servicio PreguntasRadarService
    this.subscription.unsubscribe();
  }

  // Se ejecuta después de que el componente se haya inicializado.
  ngAfterViewInit() {
    this.initGrafica();
  }
  // Se ejecuta cuando cambian las propiedades del componente
  ngOnChanges(changes: SimpleChanges) {
    //Verifica si cambiaron las propiedades nivel1, nivel2, nivel3, nivel4 o nivel5
    if (
      changes['nivel1'] ||
      changes['nivel2'] ||
      changes['nivel3'] ||
      changes['nivel4'] ||
      changes['nivel5']
    ) {
      // Actualiza la gráfica y guarda los datos.
      this.updateGrafica();
      this.guardarDatos();
    }
  }

  //Inicializa la gráfica.
  initGrafica() {
    // Crea una instancia de la gráfica en el contenedor del DOM.
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    // Establece las opciones de la gráfica.
    this.setOptions();
  }

  //Actualiza la gráfica.
  updateGrafica() {
    // Verifica si la gráfica ya se inicializó
    if (this.contenedorGrafica) {
      // Establece las opciones de la gráfica.
      this.setOptions();
    }
  }

  //Establece las opciones de la gráfica.
  setOptions() {
    //Crea un objeto con las opciones de la gráfica.
    const opciones = {
      radar: {
        indicator: [
          { name: 'C. CLIENTE', max: 4 },
          { name: 'C. NEGOCIO', max: 4 },
          { name: 'M. NEGOCIO', max: 4 },
          { name: 'C. INTERNA', max: 4 },
          { name: 'S. FINANCIERA', max: 4 },
        ],
      },
      series: [
        {
          name: 'Resultados',
          type: 'radar',
          data: [
            {
              value: [
                this.preguntaRadarService.seccion1,
                this.preguntaRadarService.seccion2,
                this.preguntaRadarService.seccion3,
                this.preguntaRadarService.seccion4,
                this.preguntaRadarService.seccion5,
              ],
              name: 'Resultados',
            },
          ],
        },
      ],
    };
    this.contenedorGrafica.setOption(opciones);
  }

  guardarDatos() {
    // Llama al método guardarDatos del servicio PreguntasRadarService
    this.preguntaRadarService.guardarDatos();
  }
}
