import { Component } from '@angular/core';
import { FormularioPreguntasComponent } from '../formulario-preguntas/formulario-preguntas.component';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-circulo-dorado-page',
  standalone: true,
  imports: [FormularioPreguntasComponent, HeaderComponent],
  templateUrl: './circulo-dorado-page.component.html',
  styleUrl: './circulo-dorado-page.component.css'
})
export class CirculoDoradoPageComponent {

}
