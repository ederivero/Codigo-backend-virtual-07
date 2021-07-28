const socket = io("https://chat-socket-eduardo.herokuapp.com/");
const btnIngresar = document.getElementById("btnIngresar");
const username = document.getElementById("username");
const usuarios_conectados = document.getElementById("usuarios-conectados");
const mensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("btnEnviar");
const listaMensajes = document.getElementById("listaMensajes");
const divChat = document.getElementById("chat");
const divLogin = document.getElementById("login");
const estado = document.getElementById("estado");

function timejs(number, index) {
  return [
    ["justo ahora", "justo ahora"],
    ["hace %s segundos", "en %s segundos"],
    ["hace 1 minuto", "en 1 minuto"],
    ["hace %s minutos", "en %s minutos"],
    ["hace 1 hora", "en 1 hora"],
    ["hace %s horas", "en %s horas"],
    ["hace 1 día", "en 1 día"],
    ["hace %s días", "en %s días"],
    ["hace 1 semana", "en 1 semana"],
    ["hace %s semanas", "en %s semanas"],
    ["hace 1 mes", "en 1 mes"],
    ["hace %s meses", "en %s meses"],
    ["hace 1 año", "en 1 año"],
    ["hace %s años", "en %s años"],
  ][index];
}

socket.on("connect", () => {
  // si queremos visualizar el id del socket que se ha suscrito en el backend entonces con llamar a socket.id DENTRO del metodo connect nos dara el mismo id que trabaja en el backend
  console.log(socket.id);
  // socket.connected => me retornara el estado de mi backend
  console.log(socket.connected);
  if (socket.connected) {
    estado.classList.remove("bg-danger");
    estado.classList.add("bg-success");
    estado.innerText = "ONLINE";
  }
  console.log(socket.disconnected);
});

socket.on("disconnect", (razon) => {
  // nos indicara la razon si es que en plena conexion se corta la transmision, mas no indicara si es que al momento de conectarnos no nos podemos conectar
  console.log(razon);
  estado.classList.remove("bg-success");
  estado.classList.add("bg-danger");
  estado.innerText = "OFFLINE";
});

timeago.register("español", timejs);

btnIngresar.addEventListener("click", (evento) => {
  socket.emit("registrar", { username: username.value });
  divChat.style.display = "block";
  btnIngresar.style.display = "none";
  username.style.display = "none";
});

socket.on("lista-usuarios", (usuarios) => {
  usuarios_conectados.innerText = "";
  usuarios.forEach((usuario) => {
    const usuarioli = document.createElement("li");
    usuarioli.classList.add("list-group-item");

    usuarioli.innerText = usuario.username;
    usuarios_conectados.appendChild(usuarioli);
  });
});

btnEnviar.addEventListener("click", (evento) => {
  console.log(mensaje.value);
  socket.emit("mensaje-nuevo", mensaje.value);
  mensaje.value = "";
});

socket.on("lista-mensajes", (mensajes) => {
  listaMensajes.innerText = "";
  mensajes.forEach((mensaje) => {
    const fecha = timeago.format(mensaje.fecha, "español");
    const mensajeli = document.createElement("li");
    mensajeli.classList.add("list-group-item");

    mensajeli.innerText = `${mensaje.username} dice ${fecha}: ${mensaje.mensaje}`;
    listaMensajes.appendChild(mensajeli);
  });
});
