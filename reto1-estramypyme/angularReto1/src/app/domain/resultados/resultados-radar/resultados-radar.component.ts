import { Component, OnInit } from '@angular/core';
import { PreguntasRadarService } from '../../radarEstrategico/services/preguntas-radar.service';

@Component({
  selector: 'app-resultados-radar',
  standalone: true,
  imports: [],
  templateUrl: './resultados-radar.component.html',
  styleUrl: './resultados-radar.component.css',
})
export class ResultadosRadarComponent implements OnInit {
  conocimientoCliente: string = '';
  conocimientoNegocio: string = '';
  CoherenciaModeloNegocio: string = '';
  AlineacionComunicacionInterna: string = '';
  saludFinanciera: string = '';

  constructor(public preguntaRadarService: PreguntasRadarService) {}

  ngOnInit(): void {
    // Leer los datos de localStorage
    this.preguntaRadarService.cargarDatosGuardados();
    if (this.preguntaRadarService.seccion1 == 0) {
      this.conocimientoCliente = ' ';
    }
    if (this.preguntaRadarService.seccion1 == 1) {
      this.conocimientoCliente =
        'Se le dificulta describir quién es su cliente.';
    } else if (this.preguntaRadarService.seccion1 == 2) {
      this.conocimientoCliente =
        'Solo describe al cliente desde una segmentación tradicional de mercado (estrato, edad, etc.).';
    } else if (this.preguntaRadarService.seccion1 == 3) {
      this.conocimientoCliente =
        'Conoce su cliente, lo describe desde su estilo de vida, hábitos de consumo, comportamiento, tareas por hacer, dolores, alegrías.';
    } else if (this.preguntaRadarService.seccion1 == 4) {
      this.conocimientoCliente =
        'Identifica, además, si su negocio atiende solo uno o varios tipos de clientes. Diferencia en su negocio al consumidor, el comprador y/o el cliente.';
    }
    if (this.preguntaRadarService.seccion2 == 0) {
      this.conocimientoNegocio = ' ';
    }
    if (this.preguntaRadarService.seccion2 == 1) {
      this.conocimientoNegocio =
        'Se le dificulta definir a su cliente, que tarea resuelve y cuáles son los productos o servicios que ofrece.';
    } else if (this.preguntaRadarService.seccion2 == 2) {
      this.conocimientoNegocio =
        'Identifica en qué negocio está pero no cómo se diferencia de sus competidores.';
    } else if (this.preguntaRadarService.seccion2 == 3) {
      this.conocimientoNegocio =
        'Identifica los recursos, actividades y aliados claves de su negocio.';
    } else if (this.preguntaRadarService.seccion2 == 4) {
      this.conocimientoNegocio =
        'Identifica el negocio en el que está y lo que sabe hacer mejor que sus competidores (capacidades distintivas). Además mantiene relaciones sanas con sus aliados claves.';
    }
    if (this.preguntaRadarService.seccion3 == 0) {
      this.CoherenciaModeloNegocio = ' ';
    }
    if (this.preguntaRadarService.seccion3 == 1) {
      this.CoherenciaModeloNegocio =
        'La propuesta de valor no es clara y se limita a la descripción del producto.';
    } else if (this.preguntaRadarService.seccion3 == 2) {
      this.CoherenciaModeloNegocio =
        'Existe una propuesta de valor definida y clara, pero ésta no es plenamente coherente con el perfil del cliente.';
    } else if (this.preguntaRadarService.seccion3 == 3) {
      this.CoherenciaModeloNegocio =
        'Existe coherencia entre la propuesta de valor y el perfil del cliente, pero no con los demás elementos del modelo de negocio.';
    } else if (this.preguntaRadarService.seccion3 == 4) {
      this.CoherenciaModeloNegocio =
        'Existe coherencia entre la definición del cliente, la propuesta de valor y los demás elementos del modelo de negocio.';
    }
    if (this.preguntaRadarService.seccion4 == 0) {
      this.AlineacionComunicacionInterna = ' ';
    }
    if (this.preguntaRadarService.seccion4 == 1) {
      this.AlineacionComunicacionInterna =
        'Lo que comunica la administración es diferente a lo que comunica el nivel operativo.';
    } else if (this.preguntaRadarService.seccion4 == 2) {
      this.AlineacionComunicacionInterna =
        'Solo la administración conoce el propósito común.';
    } else if (this.preguntaRadarService.seccion4 == 3) {
      this.AlineacionComunicacionInterna =
        'Las personas entrevistadas entán alineadas en los objetivos de su área funcional, pero no con el propósito común.';
    } else if (this.preguntaRadarService.seccion4 == 4) {
      this.AlineacionComunicacionInterna =
        'El área administrativa y operativa le apuntan a un propósito común';
    }
    if (this.preguntaRadarService.seccion5 == 0) {
      this.saludFinanciera = ' ';
    }
    if (this.preguntaRadarService.seccion5 == 1) {
      this.saludFinanciera =
        'No se lleva información financiera de manera sistemática.';
    } else if (this.preguntaRadarService.seccion5 == 2) {
      this.saludFinanciera =
        'Los resultados financieros no son positivos; la empresa presenta dificultades, principalmente de liquidez.';
    } else if (this.preguntaRadarService.seccion5 == 3) {
      this.saludFinanciera =
        'Si bien los resultados financieros no son positivos, se llevan a cabo acciones deliberadas para mitigar los impactos y se tiene claridad de la ruta financiera por seguir.';
    } else if (this.preguntaRadarService.seccion5 == 4) {
      this.saludFinanciera =
        'Los ingresos de operación son muy superiores a los costos de operación, quedando un margen operacional que permitirá crecer en el futuro.';
    }
  }
}
