import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-resultados-radar',
  standalone: true,
  imports: [],
  templateUrl: './resultados-radar.component.html',
  styleUrl: './resultados-radar.component.css',
})
export class ResultadosRadarComponent implements OnInit {
  nivel1: number = 0;
  nivel2: number = 0;
  nivel3: number = 0;
  nivel4: number = 0;
  nivel5: number = 0;
  conocimientoCliente: string = '';
  conocimientoNegocio: string = '';
  CoherenciaModeloNegocio: string = '';
  AlineacionComunicacionInterna: string = '';
  saludFinanciera: string = '';

  ngOnInit(): void {
    // Leer los datos de localStorage
    this.nivel1 = Number(localStorage.getItem('nivel1')) || 0;
    if (this.nivel1 == 1) {
      this.conocimientoCliente = 'Se le dificulta describir quién es su cliente.';
    }else if (this.nivel1 == 2) {
      this.conocimientoCliente = 'Solo describe al cliente desde una segmentación tradicional de mercado (estrato, edad, etc.).';
    }else if (this.nivel1 == 3) {
      this.conocimientoCliente = 'Conoce su cliente, lo describe desde su estilo de vida, hábitos de consumo, comportamient, tareas por hace, dolores, alegrías.';
    }else{
      this.conocimientoCliente = 'Identifica, además, si su negoci atiende solo uno o varios tipos de clientes. Diferencia en su negocio al cosumidor, el comprador y/o el cliente.';
    }
    this.nivel2 = Number(localStorage.getItem('nivel2')) || 0;
    if (this.nivel2 == 1) {
      this.conocimientoNegocio = 'Se le dificulta definir a su cliente, que tarea resuelve y cuáles son los productos o servicios que ofrece.';
    }else if (this.nivel2 == 2) {
      this.conocimientoNegocio = 'Identifica en qué negocio está pero no cómo se diferencia de sus competidores.';
    }else if (this.nivel2 == 3) {
      this.conocimientoNegocio = 'Identifica los recursos, actividades y aliados claves de su negocio.';
    }else{
      this.conocimientoNegocio = 'Identifica el negocio en el que está y lo que sabe hacer mejor que sus competidores (capacidades distintivas). Además mantiene relaciones sanas con sus aliados claves.';
    }
    this.nivel3 = Number(localStorage.getItem('nivel3')) || 0;
    if (this.nivel3 == 1) {
      this.CoherenciaModeloNegocio = 'La propuesta de valor no es clara y se limita a la descripción del producto.';
    }else if (this.nivel3 == 2) {
      this.CoherenciaModeloNegocio = 'Existe una propuesta de valor definida y clara, pero ésta no es plenamente coherente con el perfil del cliente.';
    }else if (this.nivel3 == 3) {
      this.CoherenciaModeloNegocio = 'Existe coherencia entre la propuesta de valor y el perfil del cliente, pero no con los demás elementos del modelo de negocio.';
    }else{
      this.CoherenciaModeloNegocio = 'Existe coherencia entre la definición del cliente, la propuesta de valor y los demás elementos del modelo de negocio.';
    }
    this.nivel4 = Number(localStorage.getItem('nivel4')) || 0;
    if (this.nivel4 == 1) {
      this.AlineacionComunicacionInterna = 'Lo que comunica la administración es diferente a lo que comunica el nivel operativo.';
    }else if (this.nivel4 == 2) {
      this.AlineacionComunicacionInterna = 'Solo la administración conoce el propósito común.';
    }else if (this.nivel4 == 3) {
      this.AlineacionComunicacionInterna = 'Las personas entrevistadas entán alineadas en los objetivos de su área funcional, pero no con el propósito común.';
    }else{
      this.AlineacionComunicacionInterna = 'El área administrativa y operativa le apuntan a un propósito común';
    }
    this.nivel5 = Number(localStorage.getItem('nivel5')) || 0;
    if (this.nivel5 == 1) {
      this.saludFinanciera = 'No se lleva información financiera de manera sistemática.';
    }else if (this.nivel5 == 2) {
      this.saludFinanciera = 'Los resultados financieros no son positivos; la empresa presenta dificultades, principalmente de liquidez.';
    }else if (this.nivel5 == 3) {
      this.saludFinanciera = 'Si bien los resultados financieros no son positivos, se llevan a cabo acciones deliberadas para mitigar los impactos y se tiene claridad de la ruta financiera por seguir.';
    }else{
      this.saludFinanciera = 'Los ingresos de operación son muy superiores a los costos de operación, quedando un margen operacional que permitirá crecer en el futuro.';
    }
  }
}
