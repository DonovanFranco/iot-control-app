
  // Variable global para almacenar la IP pública
  let globalIP = "";

  // Función para obtener la IP pública
  function obtenerIP() {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        globalIP = data.ip;
        console.log('IP pública obtenida:', globalIP);
      })
      .catch(error => {
        console.error('Error al obtener la IP:', error);
      });
  }

  // Llamamos a obtenerIP apenas carga la página
  window.onload = obtenerIP;

  // Función para enviar el comando
  function sendCommand(command) {
    // Actualiza el estado en la interfaz
    document.getElementById('movementStatus').innerText = command;

    // Construimos el objeto JSON
    const data = {
      name: "Donovan Franco",
      ip: globalIP || "IP-no-disponible", // Usa la IP global (o un texto de error si aún no está cargada)
      status: command
    };

    // Hacemos el POST usando fetch
    fetch('http://44.203.212.7/api/devices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición');
      }
      return response.json();
    })
    .then(result => {
      console.log('Respuesta de la API:', result);
    })
    .catch(error => {
      console.error('Error al enviar la orden:', error);
    });
  }
