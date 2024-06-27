let numeroSecreto = 0;
let maximoIntentos = 5;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function verificarIntento() {
  let numero = parseInt(document.getElementById("valorUsuario").value);

  if (maximoIntentos > 0) {
    if (numero === numeroSecreto) {
      asignarTextoElemento(
        "p",
        `¡Felicidades! Has acertado el número secreto en ${
          6 - maximoIntentos
        } intentos.`
      );
      document.getElementById("reiniciar").removeAttribute("disabled");
      document.getElementById("intentar").setAttribute("disabled", "true");
    } else {
      maximoIntentos--;
      if (maximoIntentos > 0) {
        if (numero > numeroSecreto) {
          asignarTextoElemento(
            "p",
            `El número secreto es menor a ${numero}. \nNo has acertado, te quedan ${maximoIntentos} intentos`
          );
        } else {
          asignarTextoElemento(
            "p",
            `El número secreto es mayor a ${numero}. \nNo has acertado, te quedan ${maximoIntentos} intentos`
          );
        }
        limpiarCaja();
      } else {
        asignarTextoElemento(
          "p",
          `Se te acabaron los intentos, el número secreto era ${numeroSecreto}`
        );
        document.getElementById("reiniciar").removeAttribute("disabled");
        document.getElementById("intentar").setAttribute("disabled", "true");
      }
    }
  }
}

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  //Si ya sorteamos todos los números
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números posibles");
  } else {
    //Si el numero generado está incluido en la lista
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del número secreto!");
  asignarTextoElemento("p", `Indica un número del 1 al 10`);
  numeroSecreto = generarNumeroSecreto();
  maximoIntentos = 5;
  document.getElementById("intentar").removeAttribute("disabled");
  console.log(numeroSecreto);
}

function reiniciarJuego() {
  //limpiar caja
  limpiarCaja();
  //Indicar mensaje de intervalo de números
  //Generar el número aleatorio
  //Inicializar el número intentos
  condicionesIniciales();
  //Deshabilitar el botón de nuevo juego
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

condicionesIniciales();
