import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ResultadosRadarComponent } from '../resultados-radar/resultados-radar.component';
import { ResultadosCirculoComponent } from '../resultados-circulo/resultados-circulo.component';
import { HeaderComponent } from '../../header/header.component';
import { PreguntasService } from '../../circuloDorado/services/preguntas.service';

@Component({
  selector: 'app-resultadospage',
  standalone: true,
  imports: [
    ResultadosRadarComponent,
    ResultadosCirculoComponent,
    HeaderComponent,
  ],
  templateUrl: './resultadospage.component.html',
  styleUrl: './resultadospage.component.css',
})
export class ResultadospageComponent implements OnInit {
  respuestasSeleccionadas: any;

  @Output() cambioPregunta = new EventEmitter<number>();
  @Output() respuestaGuardada = new EventEmitter<void>();

  preguntaService = inject(PreguntasService);

  ngOnInit(): void {
    this.preguntaService.getPreguntas();
  }

  obtenerRespuestasSeleccionadas() {
    this.respuestasSeleccionadas = this.preguntaService.getRespuestas();
  }

  // manejarSiguiente(respuesta: number) {

  //   console.log(
  //     this.preguntaService.guardarRespuesta(this.indexPregunta, respuesta),
  //     this.respuestaGuardada.emit(),
  //     this.cambioPregunta.emit(this.indexPregunta)
  //   );
  // }
}
