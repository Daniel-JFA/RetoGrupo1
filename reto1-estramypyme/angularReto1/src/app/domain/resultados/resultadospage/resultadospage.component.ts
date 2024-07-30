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
import { GraficaCirculoComponent } from '../../circuloDorado/grafica-circulo/grafica-circulo.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resultadospage',
  standalone: true,
  imports: [
    ResultadosRadarComponent,
    ResultadosCirculoComponent,
    HeaderComponent,
    GraficaCirculoComponent,
  ],
  templateUrl: './resultadospage.component.html',
  styleUrl: './resultadospage.component.css',
})
export class ResultadospageComponent {

  constructor(public preguntaService: PreguntasService) {}
}
