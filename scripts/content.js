const url = "http://127.0.0.1/recargasBackend2/public/api/recargas/insertarDatos"; // Reemplaza con la URL de tu endpoint
//const url = "http://127.0.0.1/backend_recargasImpresion/public/api/recargas";
var recargaAnterior = {};

const enviarDatos = (data) => {
  if (JSON.stringify(recargaAnterior) === JSON.stringify(data)) {
    console.log("Se esta intentando insertar una recarga ya existente");
  } else {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result); // Aquí puedes procesar la respuesta del servidor
        recargaAnterior = data;
      })
      .catch((error) => {
        console.error("Error:", error); // Manejo de errores
      });
  }

};

function extraerDatosDePagina() {
  const cardBody = document.querySelector(".card-body");
  console.log(cardBody);
  const resultados = {};

  if (cardBody) {
    resultados.compania =
      document.querySelector(".card-body p strong")?.textContent.trim() || "";
    const filas = cardBody.querySelectorAll("table tr");

    filas.forEach((fila) => {
      const columnas = fila.querySelectorAll("td");
      if (columnas.length === 2) {
        const etiqueta = columnas[0].textContent.trim().toLowerCase();
        const valor = columnas[1].textContent.trim();

        if (etiqueta.includes("producto")) {
          resultados.tipo_recarga = formatearProducto(valor);
        } else if (etiqueta.includes("teléfono")) {
          resultados.telefono = valor;
        } else if (etiqueta.includes("cantidad")) {
          resultados.monto = parseInt(formatearCantidad(valor));
        } else if (etiqueta.includes("fecha")) {
          resultados.fecha = formatearFecha(valor);
        }
      }
    });
  }

  if (Object.keys(resultados).length === 0) {
    console.log("El objeto está vacío");
  } else {
    const elementos = validarObjeto(resultados, llaves);
    if (elementos) {
      enviarDatos(resultados);
    } else {
      console.log("NO Contiene las claves requeridas");
      console.log(resultados);
    }
  }

}

const formatearFecha = (fechaStr) => {
  // Separar fecha y hora
  let [fecha, hora] = fechaStr.split(" ");
  let [dia, mes, año] = fecha.split("/"); // Dividir la parte de la fecha

  // Formatear en YYYY-MM-DD HH:MM:SS
  return `${año}-${mes}-${dia} ${hora}`;
};

const formatearProducto = (texto) => {
  return texto.replace(/\s*\$\d+$/, "");
};

function formatearCantidad(cadena) {
  const match = cadena.match(/\d+/); // Busca el primer grupo de dígitos
  return match ? match[0] : null; // Retorna solo la parte entera
}

function validarObjeto(obj, keys) {
  return keys.every(key => key in obj);
}

const llaves = ["compania", "telefono", "monto", "fecha", "tipo_recarga"];

const observer = new MutationObserver(() => {
  console.log("Detectado cambio en el DOM");
  extraerDatosDePagina();
});

observer.observe(document.body, { childList: true, subtree: true });
//Formato en que devuelve la fecha 01/03/2025 15:45:15
