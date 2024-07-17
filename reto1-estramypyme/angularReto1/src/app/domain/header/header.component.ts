import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
