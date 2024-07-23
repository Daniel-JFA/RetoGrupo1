import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreguntasService {
  // public preguntas: any[] = [];
  public seleccionada: boolean = true;
  public objetoPregunta: any;
  public opciones: any;
  public indexPregunta: number = 0;
  public respuestas: any = {};

  private readonly storageKey = 'respuestas';

  // Array para almacenar las respuestas seleccionadas
  // private respuestas: any[] = [];

  //Array de objetos que contiene cada pregunta y opciones
  basePreguntas = [
    // // Sección "¿Por qué?"
    {
      id: 0,
      pregunta:
        '¿Qué tan claro está el propósito fundamental de su empresa para todos los empleados?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 1,
      pregunta:
        '¿Qué tan comprometidos se sienten los empleados con la misión de la empresa?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 2,
      pregunta:
        '¿Con qué frecuencia se comunica el propósito de la empresa a los empleados?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 3,
      pregunta:
        '¿Qué tan alineadas están las decisiones estratégicas de la empresa con su propósito fundamental?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 4,
      pregunta:
        '¿Qué tan influyente es el propósito de la empresa en la cultura organizacional?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },

    // Sección "¿Cómo?"
    {
      id: 5,
      pregunta:
        '¿Qué tan claro están los valores y principios de la empresa para todos los empleados?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 6,
      pregunta:
        '¿Qué tan bien se implementan los valores y principios en las operaciones diarias?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 7,
      pregunta:
        '¿Qué tan diferenciadores son sus métodos y prácticas frente a la competencia?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 8,
      pregunta:
        '¿Qué tan consistentes son los procesos de la empresa con sus valores y principios?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },

    // Sección "¿Qué?"
    {
      id: 9,
      pregunta:
        '¿Qué tan innovadores son los métodos y procesos utilizados por la empresa?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 10,
      pregunta:
        '¿Qué tan alta es la calidad de los productos/servicios ofrecidos por la empresa?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 11,
      pregunta:
        '¿Qué tan bien se alinean los productos/servicios con el propósito de la empresa?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 12,
      pregunta:
        '¿Qué tan satisfechos están los clientes con los productos/servicios de la empresa?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 13,
      pregunta:
        '¿Qué tan innovadores son los productos/servicios de la empresa?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
    {
      id: 14,
      pregunta:
        '¿Qué tan amplia es la variedad de productos/servicios que ofrece la empresa?',
      opciones: [
        { id: 0, texto: 'Nada' },
        { id: 1, texto: 'Poco' },
        { id: 2, texto: 'Mucho' },
      ],
    },
  ];

  //Este método devuelve el array basePreguntas que contiene todas las preguntas y opciones del cuestionario.
  getPreguntas(): any {
    return this.basePreguntas;
  }

  //El constructor de la clase no hace nada en este caso, pero se utiliza para inicializar la clase.
  constructor() {
    this.cargarRespuestas();
  }

  cargarPregunta(index: number) {
    if (index < this.basePreguntas.length) {
      this.seleccionada = false;
      this.objetoPregunta = this.basePreguntas[index];
      this.opciones = this.objetoPregunta.opciones;
    }
  }

  // Método para obtener las respuestas seleccionadas
  getRespuestas() {
    return this.respuestas;
  }

  // Método para guardar las respuestas en localStorage
  guardarRespuesta(indexPregunta: number, respuesta: number): void {
    this.respuestas[indexPregunta] = respuesta;
    console.log(`Pregunta ${indexPregunta} respondida con: ${respuesta}`);
    localStorage.setItem(this.storageKey, JSON.stringify(this.respuestas));
  }

  // Método para cargar las respuestas desde localStorage
  private cargarRespuestas(): void {
    const guardarRespuestas = localStorage.getItem(this.storageKey);
    if (guardarRespuestas) {
       this.respuestas = JSON.parse(guardarRespuestas);
    }
  }

  reiniciarRespuestas(): void {
    localStorage.removeItem('respuestas');
    this.getPreguntas();
  }
}
