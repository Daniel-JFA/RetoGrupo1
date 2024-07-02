let indexPregunta = 0;

function cargarPregunta(id) {
  // document
  //   .querySelectorAll(".contenedor-respuestas input[type='radio']")
  //   .forEach((radio) => {
  //     radio.checked = false;
  //   });

  objetoPregunta = basePreguntas[id];
  opciones = objetoPregunta.opciones;
  document.getElementById("progreso").innerHTML = `Pregunta ${
    indexPregunta + 1
  } de ${basePreguntas.length}`;
  document.getElementById("contenedor-parrafo").innerHTML =
    objetoPregunta.pregunta;

  document.querySelector("label#opcion1").innerHTML = opciones.opcion1;
  document.querySelector("label#opcion2").innerHTML = opciones.opcion2;
  document.querySelector("label#opcion3").innerHTML = opciones.opcion3;
}

function seleccionarOpcion(id) {
  let validezRespuesta =
    (opciones[id] == objetoPregunta.opcion1) | opcion2 | opcion3;

  if (validezRespuesta) {
    indexPregunta++;
    if (indexPregunta == 5) {
      Swal.fire({
        title: "¡Bien hecho, has terminado la sección '¿Por qué?'! 👏",
        customClass: "my-custom-class",
      }).then(() => {
        // Cuando el modal se cierre, activa la pestaña ¿Cómo? y carga la pregunta 6

        indexPregunta = 5;
        document.getElementById("como").checked = true;
        cargarPregunta(indexPregunta);
      });
    } else if (indexPregunta == 10) {
      Swal.fire({
        title: "¡Bien hecho, has terminado la sección '¿Cómo?!' 👏",
        customClass: "my-custom-class",
      }).then(() => {
        // Cuando el modal se cierre, activa la pestaña ¿Cómo? y carga la pregunta 6
        indexPregunta = 10;
        document.getElementById("que").checked = true;
        cargarPregunta(indexPregunta);
      });
    } else if (indexPregunta == 15) {
      Swal.fire({
        title: "¡Bien hecho, has finalizado todas las secciones' 👏",
        text: "¡Modelo Círculo Dorado completado!🎉",
        customClass: "my-custom-class",
      }).then(() => {
        // Cuando el modal se cierre, activa la pestaña ¿Cómo? y carga la pregunta 6
        indexPregunta = 0;
        document.getElementById("porque").checked = true;
        cargarPregunta(indexPregunta);
      });
    }
  }
  cargarPregunta(indexPregunta);
}

cargarPregunta(indexPregunta);
