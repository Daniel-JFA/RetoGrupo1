import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreguntasService {
  // public preguntas: any[] = [];
  public seleccionada2!: any;
  public objetoPregunta: any;
  public opciones: any;
  public indexPregunta: number = 0;
  public respuestas: any = {};
  radioValue!: string;

  private readonly storageKey = 'respuestas';

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

  private indexPreguntaSubject = new BehaviorSubject<number>(0);
  public indexPregunta$ = this.indexPreguntaSubject.asObservable();
  private readonly respuestasReiniciadasSubject = new BehaviorSubject<boolean>(
    false
  );
  public respuestasReiniciadas$ =
    this.respuestasReiniciadasSubject.asObservable();

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
      this.objetoPregunta = this.basePreguntas[index];
      this.opciones = this.objetoPregunta.opciones;
      this.radioValue = this.respuestas[this.indexPregunta];
      this.indexPreguntaSubject.next(index);
    }
  }

  guardarEstadoFormulario(): void {
    const estadoFormulario = {
      indexPregunta: this.indexPregunta,
      respuestas: this.respuestas,
    };
    localStorage.setItem('estadoFormulario', JSON.stringify(estadoFormulario));
  }

  cargarEstadoFormulario(): void {
    const estadoFormularioString = localStorage.getItem('estadoFormulario');
    if (estadoFormularioString) {
      const estadoFormulario = JSON.parse(estadoFormularioString);
      this.indexPregunta = estadoFormulario.indexPregunta;
      this.respuestas = estadoFormulario.respuestas;
      this.radioValue = this.respuestas[this.indexPregunta];
    }
  }

  // Método para obtener las respuestas seleccionadas
  getRespuestas() {
    return this.respuestas;
  }

  // Método para guardar las respuestas en localStorage
  guardarRespuesta(indexPregunta: number, respuesta: string): void {
    this.respuestas[indexPregunta] = respuesta;
    console.log(`Pregunta ${indexPregunta} respondida con: ${respuesta}`);
    localStorage.setItem(this.storageKey, JSON.stringify(this.respuestas));
  }

  // Método para cargar las respuestas desde localStorage
  cargarRespuestas() {
    const guardarRespuestas = localStorage.getItem(this.storageKey);
    if (guardarRespuestas) {
      this.respuestas = JSON.parse(guardarRespuestas);
    }
  }

  reiniciarRespuestas(): void {
    localStorage.removeItem('respuestas');
    localStorage.removeItem('estadoFormulario');
    this.getPreguntas();
    this.indexPregunta = 0;
    this.radioValue = ' ';
    this.respuestasReiniciadasSubject.next(true);
    this.indexPreguntaSubject.next(0);

  }
}
