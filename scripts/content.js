const url = "https://recargas-tickets.com/api/recargas"; // Reemplaza con la URL de tu endpoint

if (document.getElementById("form1")) {
  var data = obtenerValores();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result); // Aquí puedes procesar la respuesta del servidor
      alert("Respuesta exitosa");
    })
    .catch((error) => {
      console.error("Error:", error); // Manejo de errores
    });
} else {
  var data = {
    amount: 200,
    titleTicket: "Venta paquete",
    phone: "4434100234",
    terminal: "460288",
    telcelid: 2,
    responsetime: "2023-08-07 16:57:01",
  };
  //console.log("Sin datos para imprimir");
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result); // Aquí puedes procesar la respuesta del servidor
      alert("Respuesta exitosa");
    })
    .catch((error) => {
      console.error("Error:", error); // Manejo de errores
    });
}

function obtenerValores() {
  // Obtenemos el formulario por su ID
  var form = document.getElementById("form1");

  // Obtenemos una lista de todos los inputs dentro del formulario
  var inputs = form.getElementsByTagName("input");

  // Creamos un objeto para almacenar los valores de los inputs de tipo "hidden"
  var valoresHidden = {};

  // Asignamos los valores que enviaremos al objeto
  var monto = inputs[4];
  valoresHidden[monto.name] = parseInt(monto.value);
  var tipo_recarga = inputs[1];
  valoresHidden[tipo_recarga.name] = tipo_recarga.value;
  var telefono = inputs[3];
  valoresHidden[telefono.name] = telefono.value;
  //Terminal (ID)
  var terminal = inputs[5];
  valoresHidden[terminal.name] = terminal.value;
  //Compañia
  var compania = inputs[6];
  /*switch (compania.value) {
    case "818359":
      valoresHidden["telcelid"] = 1;
      break;
    case "409797":
      valoresHidden["telcelid"] = 2;
      break;
  }*/
  valoresHidden["telcelid"] = 1;
  console.log(valoresHidden.telcelid);
  var fecha = inputs[7];
  valoresHidden[fecha.name] = formatoFecha(fecha.value);
  return valoresHidden;
}

function verificaSaldo() {
  var saldo = document.getElementById("balanceLabel");
  var valorNumerico = saldo.textContent.replace(/[^\d.,]/g, "");
  var valorMostrar = valorNumerico;
  valorNumerico = valorNumerico.replace(/,/g, "");
  valorNumerico = parseFloat(valorNumerico);
  console.log(valorNumerico);
  if (valorNumerico < 1000)
    alert("Tu saldo es de: " + valorMostrar + " considera poner una recarga");
}

function formatoFecha(fechaOriginal) {
  // Crear un objeto Date utilizando la fecha original
  var fecha = new Date(fechaOriginal);

  // Obtener los componentes de la fecha
  var año = fecha.getFullYear();
  var mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // Sumar 1 porque los meses en JavaScript van de 0 a 11
  var dia = ("0" + fecha.getDate()).slice(-2);
  var hora = ("0" + fecha.getHours()).slice(-2);
  var minutos = ("0" + fecha.getMinutes()).slice(-2);
  var segundos = ("0" + fecha.getSeconds()).slice(-2);

  // Formatear la fecha en el formato DATETIME (YYYY-MM-DD HH:MI:SS)
  var fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

  return fechaFormateada;
}
