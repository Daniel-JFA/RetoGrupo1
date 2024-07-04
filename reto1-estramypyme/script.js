var chart = echarts.init(document.getElementById("main"));
var indexPregunta = 0;
// Variable que almacena el valor del progreso y es reciclada en la función progreso
var valorProgreso = 0;
//invocación de la función de progreso que crea el gráfico para que se muestre al cargar la página
progreso(indexPregunta);
//invocación de la función que crea el gráfico de circulo dorado para que se muestre al cargar la página
graficoRespuestas(indexPregunta);

function cargarPregunta(index) {
  checkedRadio = document
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

function seleccionarOpcion(index) {
  if ((opciones[index] == objetoPregunta.opcion1) | opcion2 | opcion3) {
    indexPregunta++;

    //llamada a la función de progreso que crea el gráfico
    progreso(indexPregunta);
    //llamada a la función que crea el gráfico de respuestas
    graficoRespuestas(indexPregunta);

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
        // Cuando el modal se cierre, activa la pestaña ¿Cómo? y carga la pregunta 11
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
        // Cuando el modal se cierre, vuelve al inicio
        indexPregunta = 0;
        document.getElementById("porque").checked = true;
        cargarPregunta(indexPregunta);
      });
    }
  }
  cargarPregunta(indexPregunta);
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

  window.addEventListener("resize", function () {
    myChart.resize();
  });
  chart.setOption(option);
}

//esta función se encarga de crear el gráfico de circulo dorado
function graficoRespuestas(indexPregunta) {
  var chartDom = document.getElementById("mainRespuestas");
  var myChart = echarts.init(chartDom);
  let porQue = 5;
  let como = 5;
  let que = 5;

  if (indexPregunta <= 5) {
    porQue = indexPregunta;
    como = 0;
    que = 0;
  } else if (indexPregunta > 5 && indexPregunta <= 10) {
    como = indexPregunta - 5;
    porQue = 5;
    que = 0;
  } else if (indexPregunta <= 15) {
    que = indexPregunta - 10;
    porQue = 5;
    como = 5;
    //este codigo sobra pero lo dejo para luesgo ver como solucionar el problema de la variable 'que'  que no se actualiza
  } else if (indexPregunta == 15) {
    porQue = 5;
    como = 5;
    que = 5;
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
        fontWeight: '600'
      },
    },
  };

  option && myChart.setOption(option);

  window.addEventListener("resize", function () {
    myChart.resize();
  });
}

cargarPregunta(indexPregunta);
graficoRespuestas();
