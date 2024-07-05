import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CirculoDoradoPageComponent } from './domain/circuloDorado/circulo-dorado-page/circulo-dorado-page.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CirculoDoradoPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularReto1';
}
