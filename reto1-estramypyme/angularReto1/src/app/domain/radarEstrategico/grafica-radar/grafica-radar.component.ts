import { Component, ElementRef, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
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
  private subscription: Subscription;

  @ViewChild('graficaRadar', { static: true }) contenedor!: ElementRef;

  constructor(public preguntaRadarService: PreguntasRadarService) {
    this.subscription = new Subscription();
    this.subscription.add(
      this.preguntaRadarService.indexPregunta$.subscribe((index) => {
        this.updateGrafica();
      })
    );

    this.subscription =
      this.preguntaRadarService.respuestasReiniciadas$.subscribe(
        (reiniciadas) => {
          if (reiniciadas) {
            this.updateGrafica();
          }
        }
      );
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.initGrafica();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nivel1'] || changes['nivel2'] || changes['nivel3'] || changes['nivel4'] || changes['nivel5']) {
      this.updateGrafica();
      this.guardarDatos();
    }
  }

  initGrafica() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.setOptions();
  }

  updateGrafica() {
    if (this.contenedorGrafica) {
      this.setOptions();
    }
  }

  setOptions() {
    const opciones = {
      radar: {
        indicator: [
          { name: 'CONOCIMIENTO DEL CLIENTE', max: 4 },
          { name: 'CONOCIMIENTO DEL NEGOCIO', max: 4 },
          { name: 'COHERENCIA DEL MODELO DEL NEGOCIO', max: 4 },
          { name: 'ALINEACIÓN EN LA COMUNICACIÓN INTERNA', max: 4 },
          { name: 'SALUD FINANCIERA', max: 4 },
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
    // Guardar los datos en localStorage
    this.preguntaRadarService.guardarDatos();
  }
}
