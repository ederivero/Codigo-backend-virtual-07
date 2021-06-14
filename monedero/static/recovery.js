const password = document.getElementById("password");
const btn_enviar = document.getElementById("btn_reset_password");
const correo = document.getElementById("correo");

btn_enviar.addEventListener("click", async (evento) => {
  evento.preventDefault();
  console.log("me hizo click");
  const token = location.pathname.split("/")[2];
  const cuerpo = {
    correo: correo.innerText,
    new_password: password.value,
    token,
  };

  console.log(cuerpo);
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
      if (json.success) {
        Swal.fire({
          title: "Contraseña cambiada exitosamente",
          text: json.message,
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          console.log(result);
          location.replace(location.origin);
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: json.message,
          icon: "error",
          timer: 5000,
          showConfirmButton: false,
        });
      }
      console.log(json);
    })
    .catch((error) => {
      // ingresara cuando el request no se logrado exitosamente, cors o el endpoint este incorrecto
      Swal.fire({
        title: "Error!",
        text: "Error de peticion",
        icon: "error",
      });
      console.error(error);
    });
});
