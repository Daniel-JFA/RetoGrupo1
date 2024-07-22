import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';
import { PreguntasService } from '../../circuloDorado/services/preguntas.service';
import { style } from '@angular/animations';
import { log } from 'echarts/types/src/util/log.js';

@Component({
  selector: 'app-resultados-circulo',
  standalone: true,
  imports: [],
  templateUrl: './resultados-circulo.component.html',
  styleUrl: './resultados-circulo.component.css',
})
export class ResultadosCirculoComponent implements AfterViewInit {
  opciones: any;
  respuestas: any = {};
  objetoPregunta: any;
  contenedorGrafica: any;

  @ViewChild('resultadosCirculo') contenedor!: ElementRef;
  @Input() respuestaGuardada: EventEmitter<void> = new EventEmitter<void>();
  // @Input() reinicioFormulario: EventEmitter<void> = new EventEmitter<void>();

  constructor(public preguntaService: PreguntasService) {}

  ngOnInit() {
    this.preguntaService.getPreguntas();
    this.preguntaService.cargarPregunta(this.preguntaService.indexPregunta);
    this.respuestaGuardada.subscribe(() => {
      this.iniciarGrafica();
    });
  }

  // cargarPregunta(index: number) {
  //   this.objetoPregunta = this.preguntas[index];
  //   this.opciones = this.objetoPregunta.opciones;
  // }

  cargarRespuestas(): void {
    const respuestasGuardadas = localStorage.getItem('respuestas');
    if (respuestasGuardadas) {
      this.respuestas = JSON.parse(respuestasGuardadas);
    }
  }

  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    this.iniciarGrafica();
  }

  iniciarGrafica() {
    console.log(     this.preguntaService.getRespuestas()
  );

    const categorias = ['¿Por qué?', '¿Cómo?', '¿Qué?'];
    let nadaPorque = 0,
      pocoPorque = 0,
      muchoPorque = 0;
    let nadaComo = 0,
      pocoComo = 0,
      muchoComo = 0;
    let nadaQue = 0,
      pocoQue = 0,
      muchoQue = 0;

     
      if (this.preguntaService.indexPregunta <= 5) {
        // if (respuestas === this.preguntaService.opciones[0]) nadaPorque ++;
        if (this.preguntaService.opciones[1].texto === 'Poco') pocoPorque++;
        if (this.preguntaService.opciones[2].texto === 'Mucho') muchoPorque++;
        console.log(nadaPorque);
        
      }
      // } else if (respuesta.seccion === '¿Cómo?') {
      //   if (respuesta.opcion === 'Nada') nadaComo++;
      //   else if (respuesta.opcion === 'Poco') pocoComo++;
      //   else if (respuesta.opcion === 'Mucho') muchoComo++;
      // } else if (respuesta.seccion === '¿Qué?') {
      //   if (respuesta.opcion === 'Nada') nadaQue++;
      //   else if (respuesta.opcion === 'Poco') pocoQue++;
      //   else if (respuesta.opcion === 'Mucho') muchoQue++;
      // }
    

    // const nada = [0, 0, 0];
    // const poco = [0, 0, 0];
    // const mucho = [0, 0, 0];


    // seccion.forEach(seccion, indexPregunta) => {
    //   const seccionIndex = Math.floor(indexPregunta / 5);

    //   if (seccion === 0) {
    //     nada[seccionIndex] += 1;
    //   } else if (seccion === 1) {
    //     poco[seccionIndex] += 1;
    //   } else if (seccion === 2) {
    //     mucho[seccionIndex] += 1;
    //   }
    // };

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
          data: [nadaPorque, nadaComo, nadaQue],
        },
        {
          name: 'Poco',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: [pocoPorque, pocoComo, pocoQue]
        },
        {
          name: 'Mucho',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: [muchoPorque, muchoComo, muchoQue],
        },
      ],
    };
    this.contenedorGrafica.setOption(opciones);
  
}};
