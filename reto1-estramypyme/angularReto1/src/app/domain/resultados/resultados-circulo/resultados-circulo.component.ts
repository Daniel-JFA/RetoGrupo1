import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';


@Component({
  selector: 'app-resultados-circulo',
  standalone: true,
  imports: [],
  templateUrl: './resultados-circulo.component.html',
  styleUrl: './resultados-circulo.component.css'
})
export class ResultadosCirculoComponent implements AfterViewInit {
  contenedorGrafica : any

  @ViewChild('resultadosCirculo') contenedor! : ElementRef;

  ngAfterViewInit () {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement)
    this.iniciarGrafica()
  }

  iniciarGrafica(){
    const opciones = {
      xAxis: {
        type: 'category',
        data: ['¿Por qué?', '¿Cómo?', '¿Qué?']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [
            120,
            {
              value: 200,
              itemStyle: {
                color: '#F8D203'
              }
            },
            80,
            70,
            110,
            130
          ],
          type: 'bar'
        }
      ]
    };
    this.contenedorGrafica.setOption(opciones)
  }


}
