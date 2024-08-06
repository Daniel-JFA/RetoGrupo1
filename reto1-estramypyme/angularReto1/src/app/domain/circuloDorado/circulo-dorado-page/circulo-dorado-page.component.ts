import { Component, EventEmitter, Input } from '@angular/core';
import { FormularioPreguntasComponent } from '../formulario-preguntas/formulario-preguntas.component';
import { GraficaCirculoComponent } from '../grafica-circulo/grafica-circulo.component';
import { HeaderComponent } from '../../header/header.component';
import { PreguntasService } from '../services/preguntas.service';
import { ResultadosCirculoComponent } from '../../resultados/resultados-circulo/resultados-circulo.component';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-circulo-dorado-page',
  standalone: true,
  imports: [
    FormularioPreguntasComponent,
    GraficaCirculoComponent,
    HeaderComponent,
    ResultadosCirculoComponent,
    FooterComponent
],
  templateUrl: './circulo-dorado-page.component.html',
  styleUrl: './circulo-dorado-page.component.css',
})
export class CirculoDoradoPageComponent {
  constructor(public preguntaService: PreguntasService) {}
}
