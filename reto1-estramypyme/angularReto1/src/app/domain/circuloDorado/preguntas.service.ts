import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreguntasService {
  basePreguntas = [
    // // Sección "¿Por qué?"
    {
      id: 0,
      pregunta:
        '¿Qué tan claro está el propósito fundamental de su empresa para todos los empleados?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 1,
      pregunta:
        '¿Qué tan comprometidos se sienten los empleados con la misión de la empresa?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 2,
      pregunta:
        '¿Con qué frecuencia se comunica el propósito de la empresa a los empleados?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 3,
      pregunta:
        '¿Qué tan alineadas están las decisiones estratégicas de la empresa con su propósito fundamental?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 4,
      pregunta:
        '¿Qué tan influyente es el propósito de la empresa en la cultura organizacional?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },

    // Sección "¿Cómo?"
    {
      id: 5,
      pregunta:
        '¿Qué tan claro están los valores y principios de la empresa para todos los empleados?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 6,
      pregunta:
        '¿Qué tan bien se implementan los valores y principios en las operaciones diarias?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 7,
      pregunta:
        '¿Qué tan diferenciadores son sus métodos y prácticas frente a la competencia?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 8,
      pregunta:
        '¿Qué tan consistentes son los procesos de la empresa con sus valores y principios?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },

    // Sección "¿Qué?"
    {
      id: 9,
      pregunta:
        '¿Qué tan innovadores son los métodos y procesos utilizados por la empresa?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 10,
      pregunta:
        '¿Qué tan alta es la calidad de los productos/servicios ofrecidos por la empresa?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 11,
      pregunta:
        '¿Qué tan bien se alinean los productos/servicios con el propósito de la empresa?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 12,
      pregunta:
        '¿Qué tan satisfechos están los clientes con los productos/servicios de la empresa?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 13,
      pregunta:
        '¿Qué tan innovadores son los productos/servicios de la empresa?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
    {
      id: 14,
      pregunta:
        '¿Qué tan amplia es la variedad de productos/servicios que ofrece la empresa?',
      opciones: {
        opcion1: 'Nada',
        opcion2: 'Poco',
        opcion3: 'Mucho',
      },
    },
  ];

  constructor() {}

  getPreguntas() {
    return this.basePreguntas;
  }
}
