import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CirculoDoradoPageComponent } from './domain/circuloDorado/circulo-dorado-page/circulo-dorado-page.component';
import { RadarEstrategicoPageComponent } from './domain/radarEstrategico/radar-estrategico-page/radar-estrategico-page.component';
import { ResultadospageComponent } from './domain/resultados/resultadospage/resultadospage.component';
import { InicioPageComponent } from './domain/inicio/inicio-page/inicio-page.component';

export const routes: Routes = [
  { path: '', component: InicioPageComponent },
  { path: 'inicio', component: InicioPageComponent },
  { path: 'circulo-dorado', component: CirculoDoradoPageComponent },
  { path: 'radar-estrategico', component: RadarEstrategicoPageComponent },
  { path: 'resultados', component: ResultadospageComponent },
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
