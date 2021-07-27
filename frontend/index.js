const socket = io("http://127.0.0.1:8000");
const btnIngresar = document.getElementById("btnIngresar");
const username = document.getElementById("username");

btnIngresar.addEventListener("click", (evento) => {
  socket.emit("registrar", { username: username.value });
});
