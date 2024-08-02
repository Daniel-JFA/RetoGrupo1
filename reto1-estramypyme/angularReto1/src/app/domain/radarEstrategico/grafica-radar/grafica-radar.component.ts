import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-grafica-radar',
  standalone: true,
  templateUrl: './grafica-radar.component.html',
  styleUrls: ['./grafica-radar.component.css'],
})
export class GraficaRadarComponent implements AfterViewInit, OnChanges {
  @Input() nivel1: number = 1;
  @Input() nivel2: number = 1;
  @Input() nivel3: number = 1;
  @Input() nivel4: number = 1;
  @Input() nivel5: number = 1;

  @ViewChild('graficaRadar', { static: true }) contenedor!: ElementRef;
  contenedorGrafica: any;

  ngAfterViewInit() {
    this.initGrafica();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['nivel1'] ||
      changes['nivel2'] ||
      changes['nivel3'] ||
      changes['nivel4'] ||
      changes['nivel5']
    ) {
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
                this.nivel1,
                this.nivel2,
                this.nivel3,
                this.nivel4,
                this.nivel5,
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
    localStorage.setItem('nivel1', String(this.nivel1));
    localStorage.setItem('nivel2', String(this.nivel2));
    localStorage.setItem('nivel3', String(this.nivel3));
    localStorage.setItem('nivel4', String(this.nivel4));
    localStorage.setItem('nivel5', String(this.nivel5));
  }
}
