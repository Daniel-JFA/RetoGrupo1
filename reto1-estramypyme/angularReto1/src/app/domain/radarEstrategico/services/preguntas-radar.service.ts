import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreguntasRadarService {
  //Array de objetos que contiene cada pregunta y opciones
  preguntasRadar = [
    {
      id: 0,
      titulo: 'Conocimiento del cliente',
      niveles: { nivel1: 1, nivel2: 2, nivel3: 3, nivel4: 4 },
      descripciones: {
        descripcion1: 'Se le dificulta describir quién es su cliente',
        descripcion2:
          'Solo describe al cliente desde una segmentación tradicional de mercado (estrato, edad, etc.)',
        descripcion3:
          'Conoce su cliente, lo describe desde su estilo de vida, hábitos de consumo, comportamient, tareas por hace, dolores, alegrías.',
        descripcion4:
          'Identifica, además, si su negoci atiende solo uno o varios tipos de clientes. Diferencia en su negocio al cosumidor, el comprador y/o el cliente.',
      },
    },
    {
      id: 1,
      titulo: 'Conocimiento del negocio',
      niveles: { nivel1: 1, nivel2: 2, nivel3: 3, nivel4: 4 },
      descripciones: {
        descripcion1:
          'Se le dificulta definir el negocio en el que está (quién es el clientem que tarea resuelve y cuáles son los productos o servicios que ofrece).',
        descripcion2:
          'Identifica en qué negocio está pero no cómo se diferencia de sus competidores.',
        descripcion3:
          'Identifica los recursos, actividades y aliados claves de su negocio.',
        descripcion4:
          'Identifica el negocio en el que está y lo que sabe hacer mejor que sus competidores (capacidades distintivas). Además mantiene relaciones sanas con sus aliados claves.',
      },
    },
    {
      id: 2,
      titulo: 'Coherencia del modelo de negocio',
      niveles: { nivel1: 1, nivel2: 2, nivel3: 3, nivel4: 4 },
      descripciones: {
        descripcion1:
          'La propuesta de valor no es clara y se limita a la descripción del producto',
        descripcion2:
          'Existe una propuesta de valor definida y clara, pero ésta no es plenamente coherente con el perfil del cliente.',
        descripcion3:
          'Existe coherencia entre la propuesta de valor y el perfil del cliente, pero no con los demás elementos del modelo de negocio.',
        descripcion4:
          'Existe coherencia entre la definición del cliente, la propuesta de valor y los demás elementos del modelo de negocio.',
      },
    },
    {
      id: 3,
      titulo: 'Alineación en la comunicación interna',
      niveles: { nivel1: 1, nivel2: 2, nivel3: 3, nivel4: 4 },
      descripciones: {
        descripcion1:
          'Lo que comunica la administración es diferente a lo que comunica el nivel operativo.',
        descripcion2: 'Solo la administración conoce el propósito común.',
        descripcion3:
          'Las personas entrevistadas entán alineadas en los objetivos de su área funcional, pero no con el propósito común.',
        descripcion4:
          'El área administrativa y operativa le apuntan a un propósito común.',
      },
    },
    {
      id: 4,
      titulo: 'Salud Financiera',
      niveles: { nivel1: 1, nivel2: 2, nivel3: 3, nivel4: 4 },
      descripciones: {
        descripcion1:
          'No se lleva información financiera de manera sistemática.',
        descripcion2:
          'Los resultados financieros no son positivos; la empresa presenta dificultades, principalmente de liquidez.',
        descripcion3:
          'Si bien los resultados financieros no son positivos, se llevan a cabo acciones deliberadas para mitigar los impactos y se tiene claridad de la ruta financiera por seguir.',
        descripcion4:
          'Los ingresos de operación son muy superiores a los costos de operación, quedando un margen operacional que permitirá crecer en el futuro.',
      },
    },
  ];

  //El constructor de la clase no hace nada en este caso, pero se utiliza para inicializar la clase.
  constructor() {}

  //Este método devuelve el array preguntasRadar que contiene todas las preguntas y opciones del cuestionario.
  getPreguntasRadar() {
    return this.preguntasRadar;
  }
}
