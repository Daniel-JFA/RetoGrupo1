import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ResultadosRadarComponent } from '../resultados-radar/resultados-radar.component';
import { ResultadosCirculoComponent } from '../resultados-circulo/resultados-circulo.component';

@Component({
  selector: 'app-resultadospage',
  standalone: true,
  imports: [HeaderComponent, ResultadosRadarComponent, ResultadosCirculoComponent],
  templateUrl: './resultadospage.component.html',
  styleUrl: './resultadospage.component.css'
})
export class ResultadospageComponent {

}
