import { Component } from '@angular/core';
import { ResultadosRadarComponent } from '../resultados-radar/resultados-radar.component';
import { ResultadosCirculoComponent } from '../resultados-circulo/resultados-circulo.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-resultadospage',
  standalone: true,
  imports: [ResultadosRadarComponent, ResultadosCirculoComponent, HeaderComponent],
  templateUrl: './resultadospage.component.html',
  styleUrl: './resultadospage.component.css'
})
export class ResultadospageComponent {

}
