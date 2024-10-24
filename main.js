// Declarar el array de turnos en el ámbito global
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

// función para cargar un turno de un usuario mediante un formulario html(fecha, hora, cliente)
function cargarTurno() {
  document
    .getElementById("turnoForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

      // Obtén los valores de los campos
      const fecha = document.getElementById("fecha").value;
      const hora = document.getElementById("hora").value;
      const cliente = document.getElementById("cliente").value;

      // guardar los datos en el array de turnos
      turnos.push({ fecha, hora, cliente });
      localStorage.setItem("turnos", JSON.stringify(turnos));
      alert("Turno cargado correctamente");

      console.log(turnos);
    });
}

function generarTablaTurnos() {
  const tableBody = document
    .getElementById("turnosTable")
    .getElementsByTagName("tbody")[0];

  turnos.forEach((turno) => {
    const row = document.createElement("tr");

    const cellFecha = document.createElement("td");
    cellFecha.textContent = turno.fecha;
    row.appendChild(cellFecha);

    const cellHora = document.createElement("td");
    cellHora.textContent = turno.hora;
    row.appendChild(cellHora);

    const cellCliente = document.createElement("td");
    cellCliente.textContent = turno.cliente;
    row.appendChild(cellCliente);

    tableBody.appendChild(row);
    document.getElementById("btnCargarTurno").disabled = true;
  });
}

function generarTablaTurnosPorCliente() {
  const tableBody = document
    .getElementById("turnosPorClienteTable")
    .getElementsByTagName("tbody")[0];
  // Limpiar la tabla
  tableBody.innerHTML = "";

  const turnosPorCliente = {};

  // Contar turnos por cliente
  turnos.forEach((turno) => {
    if (turnosPorCliente[turno.cliente]) {
      turnosPorCliente[turno.cliente]++;
    } else {
      turnosPorCliente[turno.cliente] = 1;
    }
  });

  // Generar la tabla
  for (const cliente in turnosPorCliente) {
    const row = document.createElement("tr");

    const cellCliente = document.createElement("td");
    cellCliente.textContent = cliente;
    row.appendChild(cellCliente);

    const cellCantidad = document.createElement("td");
    cellCantidad.textContent = turnosPorCliente[cliente];
    row.appendChild(cellCantidad);

    tableBody.appendChild(row);
  }
}
