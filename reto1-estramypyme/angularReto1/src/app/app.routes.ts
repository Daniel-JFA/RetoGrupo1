import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CirculoDoradoPageComponent } from './domain/circuloDorado/circulo-dorado-page/circulo-dorado-page.component';

export const routes: Routes = [{path:"",component: AppComponent},
    { path:"circuloDorado",
    component: CirculoDoradoPageComponent

}

];
