import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-grafica-radar',
  standalone: true,
  imports: [],
  templateUrl: './grafica-radar.component.html',
  styleUrl: './grafica-radar.component.css',
})
export class GraficaRadarComponent implements AfterViewInit {
  contenedorGrafica: any;

  @ViewChild('graficaRadar') contenedor!: ElementRef;

  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    const opciones = {
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'CONOCIMIENTO DEL CLIENTE', max: 6500 },
          { name: 'CONOCIMIENTO DEL NEGOCIO', max: 16000 },
          { name: 'COHERENCIA DEL MODELO DEL NEGOCIO', max: 30000 },
          { name: 'ALINEACIÓN EN LA COMUNICACIÓN INTERNA', max: 38000 },
          { name: 'SALUD FINANCIERA', max: 52000 },
        ],
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget',
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending',
            },
          ],
        },
      ],
    };
    this.contenedorGrafica.setOption(opciones);
  }
}
