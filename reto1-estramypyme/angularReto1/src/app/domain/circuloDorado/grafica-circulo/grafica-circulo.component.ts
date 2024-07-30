import {
  AfterViewInit,
  ElementRef,
  Component,
  ViewChild,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import * as echarts from 'echarts';
import { PreguntasService } from '../services/preguntas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grafica-circulo',
  standalone: true,
  imports: [],
  templateUrl: './grafica-circulo.component.html',
  styleUrl: './grafica-circulo.component.css',
})
export class GraficaCirculoComponent implements OnDestroy, AfterViewInit {
  //Recibe el índice de la pregunta actual desde el componente padre.
  contenedorGrafica: any;
  porQue: number = 0;
  como: number = 0;
  que: number = 0;
  private subscription: Subscription;

  @ViewChild('graficaCirculo') contenedor!: ElementRef;

  constructor(public preguntaService: PreguntasService) {
    this.subscription = this.preguntaService.indexPregunta$.subscribe(
      (index) => {
        this.actualizarProgreso(); // Actualizar gráfica cuando cambie indexPregunta
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /* Inicializa la gráfica de ECharts después de que el componente ha sido renderizado
  y establece las opciones de la gráfica y actualiza el progreso con el índice de la pregunta actual. */
  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.calcularProgreso(
      this.preguntaService.indexPregunta,
      this.progresoAlmacenado()
    );
    this.iniciarGrafica();
  }

  actualizarProgreso() {
    const progresoAlmacenado = this.progresoAlmacenado();
    const progreso = this.calcularProgreso(
      this.preguntaService.indexPregunta,
      progresoAlmacenado
    );
    this.guardarProgreso(progreso);
    this.iniciarGrafica();
  }

  guardarProgreso(progreso: any) {
    localStorage.setItem(
      'progresoGrafica',
      JSON.stringify({
        porQue: this.porQue,
        como: this.como,
        que: this.que,
      })
    );
  }

  progresoAlmacenado() {
    const progresoAlmacenado = localStorage.getItem('progresoGrafica');
    if (progresoAlmacenado) {
      const progreso = JSON.parse(progresoAlmacenado);
      this.porQue = progreso.porQue;
      this.como = progreso.como;
      this.que = progreso.que;
    }
  }

  /*Actualiza el progreso en la gráfica circular según el índice de la pregunta actual,
  modificando los valores de las series y las opciones de la gráfica.*/
  calcularProgreso(index: number, progresoAlmacenado: any) {
    if (this.preguntaService.indexPregunta == 0) {
      this.porQue = 5;
      this.como = 5;
      this.que = 5;
    } else if (this.preguntaService.indexPregunta <= 5) {
      this.porQue = this.preguntaService.indexPregunta;
      this.como = 0;
      this.que = 0;
    } else if (
      this.preguntaService.indexPregunta > 5 &&
      this.preguntaService.indexPregunta <= 10
    ) {
      this.como = this.preguntaService.indexPregunta - 4;
      this.porQue = 5;
      this.que = 0;
    } else if (this.preguntaService.indexPregunta <= 15) {
      this.que = this.preguntaService.indexPregunta - 9;
      this.porQue = 5;
      this.como = 5;
    }
  }

  iniciarGrafica() {
    const opciones = {
      title: [
        {
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
