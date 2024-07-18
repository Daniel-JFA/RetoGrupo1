var chart = echarts.init(document.getElementById("main"));
var indexPregunta = 0;
// Variable que almacena el valor del progreso y es reciclada en la función progreso
var valorProgreso = 0;
//invocación de la función de progreso que crea el gráfico para que se muestre al cargar la página
progreso(indexPregunta);
//invocación de la función que crea el gráfico de circulo dorado para que se muestre al cargar la página
graficoRespuestas(indexPregunta);

function cargarPregunta(index) {
  document
    .querySelectorAll(".contenedor-respuestas input[type='radio']")
    .forEach((radio) => {
      radio.checked = false;
    });

  objetoPregunta = basePreguntas[index];
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

function manejarSiguiente() {
  let inputRadio = document.getElementsByName("respuesta");
  let seleccionado = false;

  for (let i = 0; i < inputRadio.length; i++) {
    if (inputRadio[i].checked) {
      seleccionado = true;
      indexPregunta++;
      break;
    }
  }

  if (!seleccionado) {
    Swal.fire({
      icon: "error",
      title: "Selecciona una opción 😒",
    });
    return;
  }


  // Incrementa el índice de la pregunta para avanzar a la siguiente.

  if (indexPregunta >= 15) {
    indexPregunta = 0;
    graficoRespuestas(indexPregunta); //Reinicia cuestionario y gráfico
  }
  if (indexPregunta == 5) {
    Swal.fire({
      title: "¡Bien hecho, has terminado la sección '¿Por qué?'! 👏",
      customClass: "my-custom-class",
    }).then(() => {
      // indexPregunta = 5; // Eliminado
      document.getElementById("como").checked = true;
      cargarPregunta(indexPregunta);
    });
  } else if (indexPregunta == 10) {
    Swal.fire({
      title: "¡Bien hecho, has terminado la sección '¿Cómo?!' 👏",
      customClass: "my-custom-class",
    }).then(() => {
      // indexPregunta = 10; // Eliminado
      document.getElementById("que").checked = true;
      cargarPregunta(indexPregunta);
    });
  } else if (indexPregunta == 0) {
    Swal.fire({
      title: "¡Bien hecho, has finalizado todas las secciones' 👏",
      text: "¡Modelo Círculo Dorado completado!🎉",
      customClass: "my-custom-class",
    }).then(() => {
      // indexPregunta = 0; // Eliminado
      document.getElementById("porque").checked = true;
      cargarPregunta(indexPregunta);
    });
  }

  cargarPregunta(indexPregunta); // Carga la nueva pregunta.
  progreso(indexPregunta); // Actualiza el progreso.
  graficoRespuestas(indexPregunta); // Actualiza el gráfico de respuestas.
}
function manejarAnterior() {
  indexPregunta--; // Disminuye el índice de la pregunta para retroceder a la anterior.

  cargarPregunta(indexPregunta); // Carga la nueva pregunta.
  progreso(indexPregunta); // Actualiza el progreso.
  graficoRespuestas(indexPregunta); // Actualiza el gráfico de respuestas.
}

//esta fución se encarga de crear el gráfico de progreso
function progreso(indexPregunta) {
  valorProgreso = indexPregunta * 7;
  if (valorProgreso > 100) {
    valorProgreso = 100;
  }

  var option = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "50%"],
        radius: "100%",
        pointer: {
          show: true,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#464646",
          },
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        splitLine: {
          show: true,
          length: 30,
          lineStyle: {
            color: "auto",
            width: 2,
          },
        },
        axisTick: {
          show: true,
          splitNumber: 1, // Número de pequeños ticks entre los principales
          length: 15,
          lineStyle: {
            color: "auto",
            width: 2,
          },
        },
        axisLabel: {
          show: true,
          distance: 30,
          fontSize: 15,
          formatter: function (value) {
            if (value % (100 / 15) === 0) {
              return value;
            } else {
              return "";
            }
          },
        },
        data: [
          {
            value: valorProgreso,
            name: "Progreso",
            title: {
              offsetCenter: ["0%", "-30%"],
            },
            detail: {
              offsetCenter: ["0%", "45%"],
            },
          },
        ],
        title: {
          fontSize: 14,
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 20,
          color: "auto",
          formatter: "{value}%",
        },
      },
    ],
  };

  // window.addEventListener("resize", function () {
  //   myChart.resize();
  // });
  chart.setOption(option);
}

//esta función se encarga de crear el gráfico de circulo dorado
function graficoRespuestas(indexPregunta) {
  var chartDom = echarts.init(document.getElementById("mainRespuestas"));
  let porQue = 5;
  let como = 5;
  let que = 5;
  if (indexPregunta == 0) {
    porQue = 5;
    como = 5;
    que = 5;
  } else if (indexPregunta <= 5) {
    console.log("Estoy funcionando");
    porQue = indexPregunta;
    como = 0;
    que = 0;
  } else if (indexPregunta > 5 && indexPregunta <= 10) {
    como = indexPregunta - 5;
    porQue = 5;
    que = 0;
  } else if (indexPregunta <= 14) {
    que = indexPregunta - 10;
    porQue = 5;
    como = 5;
  }

  var option;

  option = {
    title: [
      {
        text: "", // aca va el titulo lo quite porque no se veia bien
        left: "center",
        top: 0,
      },
    ],
    polar: {
      radius: [2, "100%"],
    },
    angleAxis: {
      max: 5,
      startAngle: 90,
      show: false, // Ocultar las etiquetas y las líneas del eje angular
    },
    radiusAxis: {
      type: "category",
      data: ["¿POR QUE?", "¿COMO?", "¿QUÉ?"],
      show: false, // Ocultar las etiquetas y las líneas del eje radial
    },
    tooltip: {},

    series: {
      type: "bar",
      data: [
        {
          value: porQue,
          itemStyle: { color: "#b78700" },
        },
        { value: como, itemStyle: { color: "#d9ad26" } },
        { value: que, itemStyle: { color: "#f7d547" } },
      ],
      coordinateSystem: "polar",
      barWidth: 110, // Ancho de las barras
      barGap: "0%", // Espacio entre las barras
      label: {
        rotate: 0,
        show: true,
        position: "middle",
        formatter: "{b}",
        color: "#fff", // Color de la etiqueta
        fontSize: 18, // Tamaño de la fuente de la etiqueta
        fontWeight: "600",
      },
    },
  };

  option && chartDom.setOption(option);

  // window.addEventListener("resize", function () {
  //   myChart.resize();
  // });
}

cargarPregunta(indexPregunta);
graficoRespuestas();
