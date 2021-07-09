const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Se ejecuto la promesa exitosamente");
  }, 4000);
});

// console.log(promesa);

// promesa.then((rpta) => {
//   console.log("yo soy el primer log");
//   console.log(rpta);
//   console.log("yo soy el segundo log");
// });

async function esperarAlaPromesa() {
  const rpta = await promesa;
  console.log("yo soy el primer log");
  console.log(rpta);
  console.log("yo soy el segundo log");
}

esperarAlaPromesa();
