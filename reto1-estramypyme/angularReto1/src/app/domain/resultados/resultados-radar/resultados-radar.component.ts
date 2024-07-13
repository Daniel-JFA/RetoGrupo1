import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-resultados-radar',
  standalone: true,
  imports: [],
  templateUrl: './resultados-radar.component.html',
  styleUrl: './resultados-radar.component.css',
})
export class ResultadosRadarComponent implements AfterViewInit {
  contenedorGrafica: any;
  @ViewChild('resultadosRadar') contenedor!: ElementRef;

  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.iniciarGrafica()
  }

  iniciarGrafica() {
    const opciones = {
      xAxis: {
        type: 'category',
        data: ['C. cliente', 'C. negocio', 'Coherencia', 'Alineación', 'Salud'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [
            120,
            {
              value: 200,
              itemStyle: {
                color: '#a90000',
              },
            },
            150,
            80,
            70,
            110,
            130,
          ],
          type: 'bar',
        },
      ],
    };
    this.contenedorGrafica.setOption(opciones);
  }
}
