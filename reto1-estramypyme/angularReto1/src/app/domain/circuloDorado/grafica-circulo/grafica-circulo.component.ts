import {
  AfterViewInit,
  ElementRef,
  Component,
  ViewChild,
  Input,
  SimpleChanges,
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-grafica-circulo',
  standalone: true,
  imports: [],
  templateUrl: './grafica-circulo.component.html',
  styleUrl: './grafica-circulo.component.css',
})
export class GraficaCirculoComponent implements AfterViewInit {
  //Recibe el índice de la pregunta actual desde el componente padre.
  @Input() indexPregunta!: number;

  contenedorGrafica: any;
  porQue: number = 5;
  como: number = 5;
  que: number = 5;

  @ViewChild('graficaCirculo') contenedor!: ElementRef;

  //Actualiza el progreso cuando cambia el índice de la pregunta actual
  ngOnChanges(changes: SimpleChanges) {
    if (changes['indexPregunta']) {
      this.actualizarProgreso(changes['indexPregunta'].currentValue);
    }
  }
  /* Inicializa la gráfica de ECharts después de que el componente ha sido renderizado
  y establece las opciones de la gráfica y actualiza el progreso con el índice de la pregunta actual. */
  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.actualizarProgreso(this.indexPregunta);
  }

  /*Actualiza el progreso en la gráfica circular según el índice de la pregunta actual,
  modificando los valores de las series y las opciones de la gráfica.*/
  actualizarProgreso(index: number) {

    //Lógica para actualizar el progreso en la gráfica
    if (this.indexPregunta == 0) {
      this.porQue = 5;
      this.como = 5;
      this.que = 5;
    } else if (this.indexPregunta <= 5) {
      this.porQue = this.indexPregunta;
      this.como = 0;
      this.que = 0;
    } else if (this.indexPregunta > 5 && this.indexPregunta <= 10) {
      this.como = this.indexPregunta - 5;
      this.porQue = 5;
      this.que = 0;
    } else if (this.indexPregunta <= 15) {
      this.que = this.indexPregunta - 10;
      this.porQue = 5;
      this.como = 5;
    }

    //Gráfica círculo
    const opciones = {
      title: [
        {
          text: '', // aca va el titulo lo quite porque no se veia bien
          left: 'center',
          top: 0,
        },
      ],
      polar: {
        radius: [2, '100%'],
      },
      angleAxis: {
        max: 5,
        startAngle: 90,
        show: false, // Ocultar las etiquetas y las líneas del eje angular
      },
      radiusAxis: {
        type: 'category',
        data: ['¿POR QUE?', '¿COMO?', '¿QUÉ?'],
        show: false, // Ocultar las etiquetas y las líneas del eje radial
      },
      tooltip: {},

      series: {
        type: 'bar',
        data: [
          {
            value: this.porQue,
            itemStyle: { color: '#b78700' },
          },
          { value: this.como, itemStyle: { color: '#d9ad26' } },
          { value: this.que, itemStyle: { color: '#f7d547' } },
        ],
        coordinateSystem: 'polar',
        barWidth: 110, // Ancho de las barras
        barGap: '0%', // Espacio entre las barras
        label: {
          rotate: 0,
          show: true,
          position: 'middle',
          formatter: '{b}',
          color: '#fff', // Color de la etiqueta
          fontSize: 18, // Tamaño de la fuente de la etiqueta
          fontWeight: '600',
        },
      },
    };
    if (this.contenedorGrafica) {
      this.contenedorGrafica.setOption(opciones);
    }
  }
}
