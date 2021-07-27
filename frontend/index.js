const socket = io("http://127.0.0.1:8000");
const btnIngresar = document.getElementById("btnIngresar");
const username = document.getElementById("username");
const usuarios_conectados = document.getElementById("usuarios-conectados");

btnIngresar.addEventListener("click", (evento) => {
  socket.emit("registrar", { username: username.value });
});

socket.on("lista-usuarios", (usuarios) => {
  usuarios.forEach((usuario) => {
    console.log(usuario);
  });
});
