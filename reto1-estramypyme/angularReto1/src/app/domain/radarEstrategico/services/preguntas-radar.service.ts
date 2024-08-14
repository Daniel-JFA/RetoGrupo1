import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PreguntasRadarService {
  niveles: any;
  descripciones: any;
  preguntaSeleccionada: any;
  objetoPregunta: any;
  seccion1!: number;
  seccion2!: number;
  seccion3!: number;
  seccion4!: number;
  seccion5!: number;
  indexPregunta: number = 0;

  //El constructor de la clase no hace nada en este caso, pero se utiliza para inicializar la clase.
  constructor() {}

  // Subject que notifica cuando se reinician las respuestas.

  private readonly respuestasReiniciadasSubject = new BehaviorSubject<boolean>(
    false
  );
  public respuestasReiniciadas$ =
    this.respuestasReiniciadasSubject.asObservable();

  //Subject que notifica cuando se cambia el índice de la pregunta
  private indexPreguntaSubject = new BehaviorSubject<number>(0);
  public indexPregunta$ = this.indexPreguntaSubject.asObservable();

  //Array de objetos que contiene cada pregunta y opciones
  BasepreguntasRadar = [
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
          'Identifica, además, si su negocio atiende solo uno o varios tipos de clientes. Diferencia en su negocio al cosumidor, el comprador y/o el cliente.',
      },
    },
    {
      id: 1,
      titulo: 'Conocimiento del negocio',
      niveles: { nivel1: 1, nivel2: 2, nivel3: 3, nivel4: 4 },
      descripciones: {
        descripcion1:
          'Se le dificulta definir el negocio en el que está (quién es el cliente que tarea resuelve y cuáles son los productos o servicios que ofrece).',
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

  //Método para guardar el índice de la pregunta actual en localStorage
  guardarIndicePregunta() {
    localStorage.setItem('indicePregunta', this.indexPregunta.toString());
  }

  //Método para recuperar el índice de la pregunta actual desde localStorage
  recuperarIndicePregunta() {
    const indicePregunta = localStorage.getItem('indicePregunta');
    if (indicePregunta) {
      this.indexPregunta = parseInt(indicePregunta, 10);
    }
  }

  //Método para cargar la pregunta del radar estratégico según el índice proporcionado
  cargarPreguntaRadar(index: number) {
    if (index < this.BasepreguntasRadar.length) {
      this.preguntaSeleccionada = false;
      this.objetoPregunta = this.BasepreguntasRadar[index];
      this.niveles = this.objetoPregunta.niveles;
      this.descripciones = this.objetoPregunta.descripciones;
      console.log(`Cargando pregunta con índice: ${index}`);
      this.indexPreguntaSubject.next(index);
    } else {
      Swal.fire({
        title: "¡Bien hecho, has finalizado todas las preguntas' 👏",
        text: '¡Radar estratégico completado!🎉',
        customClass: {
          confirmButton: 'my-swal-button',
        },      }).then(() => {
        this.indexPregunta = 0;
        this.cargarPreguntaRadar(this.indexPregunta);
      });
    }
  }

  //Método para guardar los datos de las secciones en localStorage
  guardarDatos() {
    localStorage.setItem('seccion1', String(this.seccion1));
    localStorage.setItem('seccion2', String(this.seccion2));
    localStorage.setItem('seccion3', String(this.seccion3));
    localStorage.setItem('seccion4', String(this.seccion4));
    localStorage.setItem('seccion5', String(this.seccion5));
  }

  //Método para cargar los datos de las secciones desde localStorage
  cargarDatosGuardados() {
    this.seccion1 = parseInt(localStorage.getItem('seccion1') || '0', 10);
    this.seccion2 = parseInt(localStorage.getItem('seccion2') || '0', 10);
    this.seccion3 = parseInt(localStorage.getItem('seccion3') || '0', 10);
    this.seccion4 = parseInt(localStorage.getItem('seccion4') || '0', 10);
    this.seccion5 = parseInt(localStorage.getItem('seccion5') || '0', 10);
  }

  //Este método devuelve el array BasepreguntasRadar que contiene todas las preguntas y opciones del cuestionario.
  getPreguntasRadar() {
    return this.BasepreguntasRadar;
  }

  //Método para reiniciar  las respuestas del cuestionario
  reiniciarRespuestas(): void {
    localStorage.removeItem('seccion1');
    localStorage.removeItem('seccion2');
    localStorage.removeItem('seccion3');
    localStorage.removeItem('seccion4');
    localStorage.removeItem('seccion5');
    localStorage.removeItem('indicePregunta');
    this.indexPregunta = 0;
    this.seccion1 = 0;
    this.seccion2 = 0;
    this.seccion3 = 0;
    this.seccion4 = 0;
    this.seccion5 = 0;
    this.preguntaSeleccionada = null;
    this.respuestasReiniciadasSubject.next(true);
    this.indexPreguntaSubject.next(0);
    this.cargarPreguntaRadar(this.indexPregunta);
  }
}
