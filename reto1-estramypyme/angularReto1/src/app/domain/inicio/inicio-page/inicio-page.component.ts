import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from "../../footer/footer.component";




@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css',
})
export class InicioPageComponent {}
