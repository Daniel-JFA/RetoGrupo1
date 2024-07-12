import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PreguntasRadarService } from '../services/preguntas-radar.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';


@Component({
  selector: 'app-formulario-preguntas-radar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formulario-preguntas-radar.component.html',
  styleUrl: './formulario-preguntas-radar.component.css',
})
export class FormularioPreguntasRadarComponent implements OnInit, AfterViewInit {
  //Propiedades de la clase o variables que se declaran dentro de una clase)
  preguntasRadar: any[] = [];
  niveles: any;
  descripciones: any;
  indexPregunta: number = 0;
  preguntaSeleccionada: any;
  objetoPregunta: any;
  contenedorGrafica: any;

  /*"Inyecta el servicio PreguntasRadarService en la clase y crea una propiedad privada preguntaRadarService
  para acceder a sus métodos y propiedades."*/
  constructor(private preguntaRadarService: PreguntasRadarService) {}

  //Cuando el componente se inicializa
  ngOnInit(): void {
    this.preguntasRadar = this.preguntaRadarService.getPreguntasRadar();
    console.log(this.cargarPreguntaRadar(this.indexPregunta));
  }

  //Cargar cada pregunta del servicio preguntas radar
  cargarPreguntaRadar(index: number) {
    if (index < this.preguntasRadar.length) {
      this.preguntaSeleccionada = false;
      this.objetoPregunta = this.preguntasRadar[index];
      this.niveles = this.objetoPregunta.niveles;
      this.descripciones = this.objetoPregunta.descripciones;
      console.log(`Cargando pregunta con índice: ${index}`);
    } else {
      Swal.fire({
        title: "¡Bien hecho, has finalizado todas las preguntas' 👏",
        text: '¡Radar estratégico completado!🎉',
        // customClass: 'my-custom-class',
      }).then(() => {
        this.indexPregunta = 0;
        this.cargarPreguntaRadar(this.indexPregunta);
        // this.graficoRespuestas(this.indexPregunta);
      });
    }
  }

  /*"Establece la opción seleccionada en la propiedad preguntaSeleccionada y la muestra en la consola.*/
  seleccionarOpcion(nivel: any, descripcion: any) {
    this.preguntaSeleccionada = { nivel, descripcion };
    console.log(this.preguntaSeleccionada);
  }

  //Método para validar que alguna opción sea seleccionada y así avanzar a la siguiente pregunta
  manejarSiguiente() {
    if (!this.preguntaSeleccionada) {
      Swal.fire({
        icon: 'error',
        title: 'Selecciona una opción 😒',
      });
      return;
    }

    this.indexPregunta++;
    this.cargarPreguntaRadar(this.indexPregunta);
  }

  @ViewChild('graficaRadar') contenedor!: ElementRef;

  ngAfterViewInit() {
    this.contenedorGrafica = echarts.init(this.contenedor.nativeElement);
    const opciones = {
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'CONOCIMIENTO DEL CLIENTE', max: 6500 },
          { name: 'CONOCIMIENTO DEL NEGOCIO', max: 16000 },
          { name: 'ALINEACIÓN EN LA COMUNICACIÓN INTERNA', max: 30000 },
          { name: 'SALUD FINANCIERA', max: 38000 },
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
