const password = document.getElementById("password");
const btn_enviar = document.getElementById("btn_reset_password");
const correo = document.getElementById("correo");

btn_enviar.addEventListener("click", (evento) => {
  evento.preventDefault();
  console.log("me hizo click");
  const cuerpo = {};
  fetch("http://127.0.0.1:5000/reset-password", {
    method: "POST",
    body: JSON.stringify(cuerpo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // aca llega todo el bloque de respuesta
      console.log(response.status);
      // el metodo json() retorna una promesa, por lo que es necesario hacer anidamiento de promesas,
      // se retorna dicha promesa y su funcionalidad se dara en el siguiente then que declaremos, no importa cuantas promesas tengamos todas responderan a un solo catch
      return response.json();
    })
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.error(error);
    });
});
