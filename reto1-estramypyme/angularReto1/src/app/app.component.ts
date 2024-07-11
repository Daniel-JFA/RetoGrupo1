import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CirculoDoradoPageComponent } from './domain/circuloDorado/circulo-dorado-page/circulo-dorado-page.component';
import { RadarEstrategicoPageComponent } from "./domain/radarEstrategico/radar-estrategico-page/radar-estrategico-page.component";
import { HeaderComponent } from './domain/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CirculoDoradoPageComponent, RadarEstrategicoPageComponent, HeaderComponent],
  template: '<router-outlet/>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularReto1';
}
