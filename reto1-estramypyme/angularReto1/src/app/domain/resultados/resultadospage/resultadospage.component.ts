import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ResultadosRadarComponent } from '../resultados-radar/resultados-radar.component';
import { ResultadosCirculoComponent } from '../resultados-circulo/resultados-circulo.component';
import { HeaderComponent } from '../../header/header.component';
import { PreguntasService } from '../../circuloDorado/services/preguntas.service';


@Component({
  selector: 'app-resultadospage',
  standalone: true,
  imports: [ResultadosRadarComponent, ResultadosCirculoComponent, HeaderComponent],
  templateUrl: './resultadospage.component.html',
  styleUrl: './resultadospage.component.css'
})
export class ResultadospageComponent implements OnInit {
  @Input() indexPregunta!: number;
  preguntas: any[] = [];


  @Output() cambioPregunta = new EventEmitter<number>();
  @Output() respuestaGuardada = new EventEmitter<void>();

  private preguntaService = inject(PreguntasService);

  ngOnInit(): void {
    this.preguntas = this.preguntaService.getPreguntas();
  }

    manejarSiguiente(respuesta: number) {

      console.log(
        this.preguntaService.guardarRespuesta(this.indexPregunta, respuesta),
        this.respuestaGuardada.emit(),
        this.cambioPregunta.emit(this.indexPregunta)
      );
    }
    
  }

